<?php

namespace App\Observers;

use App\Models\Fine;
use App\Services\BalanceService;
use Illuminate\Support\Facades\Cache;

class FineObserver
{
    /**
     * Handle the Fine "created" event.
     *
     * @param  \App\Models\Fine  $fine
     * @return void
     */
    public function created(Fine $fine)
    {
        BalanceService::clearBalanceCache();
    }

    /**
     * Handle the Fine "updated" event.
     *
     * @param  \App\Models\Fine  $fine
     * @return void
     */
    public function updated(Fine $fine)
    {
        BalanceService::clearBalanceCache();
    }

    /**
     * Handle the Fine "deleted" event.
     *
     * @param  \App\Models\Fine  $fine
     * @return void
     */
    public function deleted(Fine $fine)
    {
        BalanceService::clearBalanceCache();
    }

    /**
     * Handle the Fine "restored" event.
     *
     * @param  \App\Models\Fine  $fine
     * @return void
     */
    public function restored(Fine $fine)
    {
        BalanceService::clearBalanceCache();
    }

    /**
     * Handle the Fine "force deleted" event.
     *
     * @param  \App\Models\Fine  $fine
     * @return void
     */
    public function forceDeleted(Fine $fine)
    {
        BalanceService::clearBalanceCache();
    }
}
