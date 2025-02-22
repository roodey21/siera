<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::with('department')->withTrashed()->get(),
            'departments' => Department::all()
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $validatedRequest = $request->validated();
        $validatedRequest['password'] = Hash::make('password');
        User::create($validatedRequest);

        return back()->with('success', 'Data user berhasil dibuat');
    }

    public function edit(User $user)
    {
        return response()->json($user, 200);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->validated());

        return back()->with('success', 'Data user berhasil disimpan');
    }

    public function destroy(User $user)
    {
        $user->status = 'inactive';
        $user->save();
        $user->delete();

        return back()->with('success', 'Data user berhasil dihapus');
    }

    public function restore($user)
    {
        $user = User::withTrashed()->findOrFail($user);
        $user->restore();

        return back()->with('success', 'Data user berhasil dipulihkan');
    }
}
