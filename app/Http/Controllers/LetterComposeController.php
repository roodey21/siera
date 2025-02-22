<?php

namespace App\Http\Controllers;

use App\Http\Requests\LetterStoreRequest;
use App\Http\Requests\LetterUpdateRequest;
use App\Models\Attachment;
use App\Models\Classification;
use App\Models\Letter;
use App\Models\LetterNumber;
use App\Models\LetterType;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LetterComposeController extends Controller
{
    public function index()
    {
        return Inertia::render('Letter/Compose/Inbox', [
            'letters' => Letter::with('letterNumber','classification', 'sender')->incoming()->get(),
            'letterTypes' => LetterType::all(),
            'classifications' => Classification::all()
        ]);
    }

    public function create()
    {
        $users = User::where('id', '!=', Auth::id())->get();

        return Inertia::render('Letter/Compose/Create', [
            'letterNumbers' => LetterNumber::doesntHave('letters')->get(),
            'users' => $users,
            'classifications' => Classification::all(),
            'letterTypes' => LetterType::all()
        ]);
    }

    public function store(LetterStoreRequest $request)
    {
        try {
            $user = Auth::user();
            $newLetter = $request->only(['letter_number_id', 'receiver', 'date', 'classification_code', 'summary']);
            $newLetter['sender'] = $user->id;
            $newLetter['user_id'] = $user->id;
            $letter = Letter::create($newLetter);
            // dd($letter);
            if ($request->hasFile('attachment')) {
                $attachment = $request->file('attachment');
                $extension = $attachment->getClientOriginalExtension();

                if (in_array($extension, ['png', 'jpg', 'jpeg', 'pdf', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx'])) {
                    $filename = $letter->letterNumber->codeWithoutSlash. '-'. $attachment->getClientOriginalName();
                    $filename = str_replace(' ', '-', $filename);
                    $attachment->storeAs('public/attachments', $filename);
                    $letter->attachment()->create([
                        'filename' => $filename,
                        'extension' => $extension,
                        'user_id' => $user->id,
                    ]);
                    // UploadFileToGoogleDrive::dispatch($attachmentFile->id);
                }
            }
            if ($request->has('dispositions')) {
                foreach ($request->dispositions as $userId) {
                    $letter->dispositions()->create([
                        'to' => $userId,
                        'note' => $request->description
                    ]);
                }
            }
            // $letter = $letter->load(['sender', 'user', 'receiver']);
            // Notification::send($letter->receiver, new IncomingLetterNotification($letter->sender, $letter->receiver, $letter->letterNumber->description, $letter, $letter->receiver->phone, 'Notifikasi sistem surat, ada surat baru untuk anda, silahkan cek ke aplikasi sekarang juga.'));
            // LetterCreated::dispatch($letter);
            // return redirect()
            //     ->route('transaction.outgoing.index')
            //     ->with('success', __('menu.general.success'));
            return back()->with('success', 'Surat berhasil terkirim');
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    public function show(Letter $letter)
    {
        !$letter->received_date && $letter->receiver == Auth::id() && $letter->update(['received_date' => now()]);
        $letter = $letter->load(['sender','receiver','letterNumber','classification','comments.user']);
        return Inertia::render('Letter/Compose/Show', compact('letter'));
    }

    public function sent()
    {
        return Inertia::render('Letter/Compose/Sent', [
            'letters' => Letter::with('letterNumber','classification', 'sender')->outcoming()->get(),
            'letterTypes' => LetterType::all(),
            'classifications' => Classification::all()
        ]);
    }

    public function edit(Letter $letter)
    {
        $users = User::where('id', '!=', Auth::id())->get();
        return Inertia::render('Letter/Compose/Edit', [
            'letter' => $letter->load(['sender', 'receiver', 'letterNumber', 'classification', 'dispositions']),
            'users' => $users,
            'classifications' => Classification::all(),
            'letterTypes' => LetterType::all()
        ]);
    }

    public function update(LetterUpdateRequest $request, Letter $letter)
    {
        try {
            $user = Auth::user();
            $updatedLetter = $request->only(['date', 'classification_code', 'summary']);
            // $newLetter['sender'] = $user->id;
            // $newLetter['user_id'] = $user->id;
            $letter->update($updatedLetter);
            $letter = $letter->fresh();
            // dd($letter);
            if ($request->hasFile('attachment')) {
                $attachment = $request->file('attachment');
                $extension = $attachment->getClientOriginalExtension();

                if (in_array($extension, ['png', 'jpg', 'jpeg', 'pdf', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx'])) {
                    $filename = $letter->letterNumber->codeWithoutSlash. '-'. $attachment->getClientOriginalName();
                    $filename = str_replace(' ', '-', $filename);
                    $attachment->storeAs('public/attachments', $filename);
                    $letter->attachment()->create([
                        'filename' => $filename,
                        'extension' => $extension,
                        'user_id' => $user->id,
                    ]);
                    // UploadFileToGoogleDrive::dispatch($attachmentFile->id);
                }
            }
            // if ($request->has('dispositions')) {
            //     foreach ($request->dispositions as $userId) {
            //         $letter->dispositions()->create([
            //             'to' => $userId,
            //             'note' => $request->description
            //         ]);
            //     }
            // }
            // $letter = $letter->load(['sender', 'user', 'receiver']);
            // Notification::send($letter->receiver, new IncomingLetterNotification($letter->sender, $letter->receiver, $letter->letterNumber->description, $letter, $letter->receiver->phone, 'Notifikasi sistem surat, ada surat baru untuk anda, silahkan cek ke aplikasi sekarang juga.'));
            // LetterCreated::dispatch($letter);
            // return redirect()
            //     ->route('transaction.outgoing.index')
            //     ->with('success', __('menu.general.success'));
            return redirect()->route('letter.sent.show', $letter->id)->with('success', 'Surat berhasil diupdate');
        } catch (\Throwable $th) {
            return back()->with('error', $th->getMessage());
        }
    }

    public function storeComment(Request $request, Letter $letter)
    {
        $request->validate([
            'body' => 'required|string'
        ]);

        $comment = $letter->comments()->create([
            'user_id' => Auth::id(),
            'body' => $request->body
        ]);

        return back()->with('success', 'Komentar berhasil ditambahkan');
    }
}
