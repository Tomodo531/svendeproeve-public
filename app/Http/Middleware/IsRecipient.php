<?php

namespace App\Http\Middleware;

use App\Models\Fine;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class IsRecipient
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        $id = $request->route()->parameter('id');
        $fine = Fine::query()->findOrFail($id);

        if($user['admin']) {
            return $next($request);
        }

        if($user['id'] == $fine['user_id']) {
            return $next($request);
        }

        abort(403);
    }
}
