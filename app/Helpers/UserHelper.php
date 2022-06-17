<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserHelper
{
    /**
     * Checks if an user exists based on the user id
     *
     * @param $id
     * @return bool
     */
    public static function exists($id): bool
    {
        return User::query()->find($id)->exists();
    }
}
