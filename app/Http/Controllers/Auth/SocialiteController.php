<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $authenticatedUser = Socialite::driver('google')->user();

        $user = User::where('email', $authenticatedUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'email' => $authenticatedUser->getEmail(),
                'name' => $authenticatedUser->getName(),
                'password' => Hash::make('password')
            ]);
        }

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
