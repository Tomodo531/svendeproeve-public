<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreatePremadeFineTest extends TestCase
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
            ->post('/api/premadefine/create', [
                'title' => 'Test',
                'description' => 'Test',
                'amount' => 100
            ]);

        $this->actingAs($user)->get('/api/premadefine?page=1');

        $this->actingAs($user)->get('/api/premadefine?page=1');

        $response->assertStatus(200);
    }
}
