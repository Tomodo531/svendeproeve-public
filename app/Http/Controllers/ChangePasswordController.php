<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    /**
     * Updates a users password
     *
     * @param ChangePasswordRequest $request
     * @return Application|ResponseFactory|Response
     */
    public function changePassword(ChangePasswordRequest $request): Response|Application|ResponseFactory
    {
        $data = $request->validated();

        User::query()->find(Auth::id())->update(['password'=> Hash::make($data['newPassword'])]);

        return response(['status' => 'Password changed successfully!'], 200);
    }
}
