<?php

namespace App\Rules;

use App\Services\BalanceService;
use Illuminate\Contracts\Validation\Rule;

class SufficientFunds implements Rule
{
    private $balance;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->balance = BalanceService::GetBalance();
    }

    /**
     * Check if the withdrawal amount is bigger than the amount in balance.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if ($this->balance < $value) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return sprintf('Insufficient funds. balance %s', $this->balance);
    }
}
