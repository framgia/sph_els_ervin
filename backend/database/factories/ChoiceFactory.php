<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'question_id' => $this->faker->randomElement(Question::all()->pluck('id')),
            'choice' => $this->faker->word(),
            'is_correct' => $this->faker->boolean(25)
        ];
    }
}
