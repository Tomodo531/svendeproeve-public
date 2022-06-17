<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTest extends TestCase
{
    //use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $admin = User::factory()->create([
            'admin' => true
        ]);

        $user = User::factory()->create();

        $response = $this->actingAs($admin)->patch('/admin/'.$user['id']);

        $response->assertStatus(200);
    }
}
