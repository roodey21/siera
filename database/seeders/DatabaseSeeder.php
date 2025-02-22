<?php

namespace Database\Seeders;

use App\Models\LetterNumber;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            LetterTypeSeeder::class,
            LetterStatusSeeder::class,
            ClassificationSeeder::class,
            DepartmentSeeder::class
        ]);

        LetterNumber::factory(10)->create();
    }
}
