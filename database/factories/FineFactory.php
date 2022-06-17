<?php

namespace Database\Factories;

use App\Enums\FineStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fine>
 */
class FineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->text(20),
            'description' => $this->faker->text(30),
            'amount' => $this->faker->numberBetween(10,50),
            'status' => FineStatusEnum::WAITING
        ];
    }
}
