<?php

namespace Tests\Feature\Fine;

use App\Models\Fine;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PayFineTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_payment_of_fine_as_recipient()
    {
        $user = User::factory()->create();
        $fine = Fine::factory()
            ->for($user)
            ->create();

        $response = $this->actingAs($user)
            ->patch('/api/fine/pay/'.$fine['id']);

        $response->assertStatus(200);
    }

    public function test_payment_of_fine_as_admin()
    {
        $admin = User::factory()->create([
            'admin' => true
        ]);

        $user = User::factory()->create();
        $fine = Fine::factory()
            ->for($user)
            ->create();

        $response = $this->actingAs($admin)
            ->patch('/api/fine/pay/'.$fine['id']);

        $response->assertStatus(200);
    }
}
