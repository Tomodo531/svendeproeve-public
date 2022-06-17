<?php

namespace App\Observers;

use App\Models\Withdrawal;
use App\Services\BalanceService;

class WithdrawalObserver
{
    /**
     * Handle the Withdrawal "created" event.
     *
     * @param  \App\Models\Withdrawal  $withdrawal
     * @return void
     */
    public function created(Withdrawal $withdrawal)
    {
        BalanceService::clearBalanceCache();
    }

    /**
     * Handle the Withdrawal "updated" event.
     *
     * @param  \App\Models\Withdrawal  $withdrawal
     * @return void
     */
    public function updated(Withdrawal $withdrawal)
    {
        BalanceService::clearBalanceCache();
    }

    /**
     * Handle the Withdrawal "deleted" event.
     *
     * @param  \App\Models\Withdrawal  $withdrawal
     * @return void
     */
    public function deleted(Withdrawal $withdrawal)
    {
        BalanceService::clearBalanceCache();
    }

    /**
     * Handle the Withdrawal "restored" event.
     *
     * @param  \App\Models\Withdrawal  $withdrawal
     * @return void
     */
    public function restored(Withdrawal $withdrawal)
    {
        BalanceService::clearBalanceCache();
    }

    /**
     * Handle the Withdrawal "force deleted" event.
     *
     * @param  \App\Models\Withdrawal  $withdrawal
     * @return void
     */
    public function forceDeleted(Withdrawal $withdrawal)
    {
        BalanceService::clearBalanceCache();
    }
}
