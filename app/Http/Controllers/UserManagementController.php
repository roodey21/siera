<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::with('department', 'roles')->withTrashed()->get(),
            'departments' => Department::all(),
            'roles' => Role::all()
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        $validatedRequest = $request->validated();
        $validatedRequest['password'] = Hash::make('password');

        $user = User::create($validatedRequest);

        static::checkAndAssignRole($user, $request->roles);

        return back()->with('success', 'Data user berhasil dibuat');
    }

    public function edit(User $user)
    {
        return response()->json($user, 200);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->validated());

        static::checkAndAssignRole($user, $request->roles);

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

    public static function checkAndAssignRole(User $user, $roles)
    {
        if ($roles) {
            $user->assignRole($roles);
        }
    }
}
