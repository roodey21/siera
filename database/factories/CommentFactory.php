<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'commentable_id'   => fake()->randomNumber(),
            'commentable_type' => fake()->randomElement(['App\Models\Post', 'App\Models\Video']),
            'user_id'          => User::factory(),
            'body'             => fake()->paragraph(),
            'created_at'       => now(),
            'updated_at'       => now(),
        ];
    }
}
