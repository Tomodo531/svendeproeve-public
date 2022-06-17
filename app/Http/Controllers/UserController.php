<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\Fine;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Return the current user
     *
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request): mixed
    {
        return $request->user();
    }

    /**
     * Return a paginated list of users
     *
     * @return JsonResponse
     */
    public function getAllUsers(): JsonResponse
    {
        $users = User::query()
            ->filter( request(['search']))
            ->paginate(100);

        return response()->json($users);
    }

    /**
     * Return users profile based on user id.
     *
     * @param $id
     * @return JsonResponse
     */
    public function getProfile($id): JsonResponse
    {
        $user = User::query()
        ->findOrFail($id);

        //Gets the total of all received fines
        $total = Fine::query()
            ->where('user_id', $id)
            ->sum('amount');

        //Gets top three premadefines received
        $topThreeFines = Fine::query()
            ->where([
                ['user_id', $id],
                ['premade_fine_id', '!=', null],
            ])
            ->select('premade_fine_id', DB::raw('count(*) as total'))
            ->groupBy('premade_fine_id')
            ->with('premadeFine')
            ->orderBy('total', 'desc')
            ->get()
            ->pluck('premadeFine')
            ->take(3);

        return response()->json([
            'user' => $user,
            'total' => $total,
            'topThreeFines' => $topThreeFines
        ]);
    }

    /**
     * Updates a users name and tag
     *
     * @param UpdateUserRequest $request
     * @return Response|Application|ResponseFactory
     */
    public function updateUser(UpdateUserRequest $request): Response|Application|ResponseFactory
    {
        $data = $request->validated();

        User::query()
            ->find(Auth::id())
            ->update([
                'name' => $data['name'],
                'tag' => $data['tag'],
            ]);

        return response(['status' => 'User information changed successfully!'], 200);
    }
}
