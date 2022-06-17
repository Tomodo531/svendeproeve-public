<?php

namespace App\Http\Controllers;

use App\Models\Fine;
use App\Models\Withdrawal;
use App\Services\BalanceService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class BalanceController extends Controller
{
    /**
     * Return the current balance
     *
     * @return Application|ResponseFactory|Response
     */
    public function index(): Response|Application|ResponseFactory
    {
        $balance = BalanceService::GetBalance();

        return response($balance, 200);
    }
}
