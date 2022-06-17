<?php

namespace App\Enums;

/**
 * All fine status states
 *
 * Waiting = Waiting for client to pay and register as pending.
 * Pending = paid by client and waiting for admin to confirm.
 * Pain = fine has been paid and confirmed by an admin.
 * Rejected = rejected payment = to waiting
 */
enum FineStatusEnum:string
{
    case WAITING = 'WAITING';
    case PENDING = 'PENDING';
    case PAID = 'PAID';
    case REJECTED = 'REJECTED';
}
