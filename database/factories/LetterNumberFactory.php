<?php

namespace Database\Factories;

use App\Models\LetterType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LetterNumber>
 */
class LetterNumberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $letterTypes = LetterType::all();
        return [
            'letter_type_id' => $letterTypes->random()->id,
            'number' => $this->faker->randomNumber(5),
            'pic' => $this->faker->name(),
            'date' => $this->faker->date(),
            'description' => $this->faker->sentence(7),
            'code' => sprintf(
                'No. %s/%s/%s/%s',
                str_pad($this->faker->randomNumber(3), 3, '0', STR_PAD_LEFT),
                $letterTypes->random()->name,
                $this->faker->randomElement(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']),
                $this->faker->randomElement(['2020', '2021', '2022', '2023', '2024', '2025'])
            ),
        ];
    }
}
