<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UpdatePremadeFineTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $user = User::factory()->create([
            'admin' => true
        ]);

        $response = $this->actingAs($user)
            ->put('/api/premadefine/update/1', [
                'title' => 'Test',
                'description' => 'Test',
                'amount' => 100
            ]);

        $response->assertStatus(200);
    }
}
