<?php

namespace App\Services;

use App\Models\Fine;
use App\Models\Withdrawal;
use Illuminate\Support\Facades\Cache;

class BalanceService
{
    /**
     * Stores total balance with withdrawal in the cache
     *
     * @return mixed
     */
    public static function GetBalance()
    {
        return Cache::store('redis')->rememberForever('balance', function () {
             $total = Fine::query()->sum('amount');
             $withdrawals = Withdrawal::query()->sum('amount');

             return $total - $withdrawals;
        });
    }

    /**
     * Stores grand total balance of all fines in the cache
     *
     * @return mixed
     */
    public static function GetGrandtotalBalance(): mixed
    {
        return Cache::store('redis')->rememberForever('grandtotalBalance', function () {
            return Fine::query()->sum('amount');
        });
    }

    /**
     * Clear the cached balance and grandtotalBalance
     *
     * @return void
     */
    public static function clearBalanceCache() {
        Cache::store('redis')->forget('balance');
        Cache::store('redis')->forget('grandtotalBalance');
    }
}
