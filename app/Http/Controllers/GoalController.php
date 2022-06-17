<?php

namespace App\Http\Controllers;

use App\Http\Requests\GoalRequest;
use App\Models\Goal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GoalController extends Controller
{
    /**
     * Return the current goal or creates one by default
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $goal = Goal::query()->firstOrCreate();

        return response()->json($goal);
    }

    /**
     * Updates the goal
     *
     * @param GoalRequest $request
     * @return JsonResponse
     */
    public function update(GoalRequest $request): JsonResponse
    {
        $data = $request->validated();

        $goal = Goal::query()
            ->firstOrFail()
            ->update([
                'title' => $data['title'],
                'description' => $data['description'],
                'amount' => $data['amount']
            ]);

        return response()->json($goal);
    }
}
