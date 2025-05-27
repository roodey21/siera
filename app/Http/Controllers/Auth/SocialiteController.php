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
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $authenticatedUser = Socialite::driver($provider)->user();

        $user = User::where('email', $authenticatedUser->getEmail())->first();

        if ($user && !$user->{$provider."_id"}) {
            $user->google_id = $authenticatedUser->getId();
            $user->save();
        }

        if (!$user) {
            $user = User::create([
                'email' => $authenticatedUser->getEmail(),
                'name' => $authenticatedUser->getName(),
                'password' => Hash::make('password'),
                $provider . "_id" => $authenticatedUser->getId()
            ]);
        }

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
