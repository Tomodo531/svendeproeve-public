<?php

namespace App\Services;

use App\Enums\FineStatusEnum;
use App\Models\Fine;

class FineService
{
    /**
     * Updates the status of and fine with one of the statuses in FineStatusEnum
     *
     * @param FineStatusEnum $status
     * @param $id
     * @return void
     */
    public static function patchFineStatus(FineStatusEnum $status, $id) {
        Fine::query()
            ->findOrFail($id)
            ->update([
                'status' => $status
            ]);
    }
}
