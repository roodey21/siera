<?php

namespace App\Http\Controllers;

use App\Http\Requests\LetterNumberStoreRequest;
use App\Models\LetterNumber;
use App\Models\LetterType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LetterNumberController extends Controller
{
    public function index()
    {
        $letterNumbers = LetterNumber::withCount('letters')->get();
        $letterTypes = LetterType::all();

        return Inertia::render('Letter/LetterNumber/Index', [
            'letterNumbers' => $letterNumbers,
            'letterTypes' => $letterTypes
        ]);
    }

    public function store(LetterNumberStoreRequest $request)
    {
        $letter = LetterNumber::create($request->validated());

        return back()->with('success', 'Surat dengan nomor : ' . $letter->code . ' berhasil disimpan');
    }

    public function generateDocument()
    {
        return Inertia::render('Letter/LetterNumber/GenerateDocument', [
            'letterNumbers' => LetterNumber::all()
        ]);
    }
}
