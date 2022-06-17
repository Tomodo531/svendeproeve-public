<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;

class AdminController extends Controller
{
    /**
     * Updates the admin status of an user based on user id
     *
     * @param $id
     * @return Application|ResponseFactory|Response
     */
    public function updateIsAdmin($id){
        $user = User::query()->findOrFail($id);

        $adminCount = User::query()->where('admin', '=', true);

        abort_if(
            $adminCount->count() === 1,
            403,
            'There has to be atleast one admin'
        );

        $user['admin'] = !$user['admin'];

        $user->update();

        return response(
            $user['admin'],
            200
        );
    }
}
