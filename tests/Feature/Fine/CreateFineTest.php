<?php

namespace Tests\Feature\Fine;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateFineTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_create_fine()
    {
        $user = User::factory()->create([
            'admin' => true
        ]);

        $response = $this->actingAs($user)
            ->post('/api/fine/create', [
            'user_id' => $user['id'],
            'fines' => [
                0 => [
                    'title' => 'Test',
                    'description' => 'Test',
                    'amount'=> 0
                ]
            ]
        ]);

        $response->assertStatus(200);
    }
}
