<?php

namespace App\Http\Controllers;

use App\Models\Withdrawal;
use App\Services\BalanceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\WithdrawalRequest;

class WithdrawalController extends Controller
{
    /**
     * Gets a paginated list of Withdrawals
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $withdrawals = Withdrawal::query()
            ->with(['user' => function ($query) {
                $query->select('id', 'name');
            }])
            ->paginate(20);

        return response()->json($withdrawals);
    }

    /**
     * Create a new Withdrawal
     *
     * @param WithdrawalRequest $request
     * @return JsonResponse
     */
    public function withdraw(WithdrawalRequest $request): JsonResponse
    {
        $data = $request->validated();

        $withdrawal = Withdrawal::query()->create([
            'user_id' => Auth::id(),
            'title' => $data['title'],
            'description' => $data['description'],
            'amount' => $data['amount'],
        ]);

        return response()->json($withdrawal);
    }

    /**
     * Delete Withdrawal based on id
     *
     * @param $id
     * @return Response
     */
    public function cancelWithdrawal($id): Response
    {
        Withdrawal::query()->findOrFail($id)->delete();

        return response()->noContent();
    }
}
