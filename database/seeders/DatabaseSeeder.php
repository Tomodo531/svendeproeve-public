<?php

namespace Database\Seeders;

use App\Models\Fine;
use App\Models\PremadeFine;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = User::factory()->create([
            'name' => 'Martin Olesen',
            'tag' => 'Tomodo',
            'email' => 'admin@admin.com',
            'admin' => true
        ]);

        $premadeFine1 = PremadeFine::factory()->create([
            'title' => 'Død i molly',
            'description' => 'Død i en molotov cocktails',
            'amount' => 10
        ]);

        $premadeFine2 = PremadeFine::factory()->create([
            'title' => 'Kurvand',
            'description' => 'Bestilt en kurvand til lan',
            'amount' => 10.5
        ]);

        $premadeFine3 = PremadeFine::factory()->create([
            'title' => 'Aage bøde',
            'description' => '42 kills i en comp',
            'amount' => 30.25
        ]);

        Fine::factory()->count(5)->create([
            'user_id' =>  $user['id'],
            'premade_fine_id' => $premadeFine1['id'],
            'title' => $premadeFine1['title'],
            'description' => $premadeFine1['description'],
            'amount' => $premadeFine1['amount'],
        ]);

        Fine::factory()->count(3)->create([
            'user_id' =>  $user['id'],
            'premade_fine_id' => $premadeFine2['id'],
            'title' => $premadeFine2['title'],
            'description' => $premadeFine2['description'],
            'amount' => $premadeFine2['amount'],
        ]);

        Fine::factory()->count(3)->create([
            'user_id' =>  $user['id'],
            'premade_fine_id' => $premadeFine3['id'],
            'title' => $premadeFine3['title'],
            'description' => $premadeFine3['description'],
            'amount' => $premadeFine3['amount'],
        ]);
    }
}
