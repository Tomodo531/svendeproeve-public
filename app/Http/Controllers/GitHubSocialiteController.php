<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class GitHubSocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function callback()
    {
        $githubUser = Socialite::driver('github')->user();

        $user = User::query()
            ->where('email', $githubUser->getEmail())
            ->first();

        if ($user !== null && $user['github_id'] === null) {
            $user->update([
                'tag' => $githubUser->getNickname(),
                'email_verified_at' => now(),
                'github_id' => $githubUser->getId(),
                'avatar' => $githubUser->getAvatar()
            ]);
        }

        if ($user === null) {
            $user = User::create([
                'email' => $githubUser->getEmail(),
                'name' => $githubUser->getName(),
                'tag' => $githubUser->getNickname(),
                'email_verified_at' => now(),
                'password' => Hash::make(Str::random(24)),
                'github_id' => $githubUser->getId(),
                'avatar' => $githubUser->getAvatar()
            ]);
        }

        Auth::login($user);

        return redirect(config('app.frontend_url') . '/dashboard');
    }
}
