<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
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

        dd($user);
    }
}
