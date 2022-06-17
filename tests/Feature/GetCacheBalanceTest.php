<?php

namespace Tests\Feature;

use App\Models\Fine;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class GetCacheBalanceTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $amount = rand(100, 200);
        $user = User::factory()->create();
        Fine::factory()
            ->count(5)
            ->for($user)
            ->create([
                'amount' => $amount
            ]);

        $response = $this->actingAs($user)
            ->get('/api/balance');

        $response = $this->actingAs($user)
            ->get('/api/balance');

        echo $response->getContent();

        $response->assertStatus(200);
    }
}
