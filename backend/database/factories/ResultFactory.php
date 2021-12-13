<?php

namespace Database\Factories;

use App\Models\Choice;
use App\Models\Question;
use App\Models\UserProgress;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user_progress_data = $this->faker->randomElement(UserProgress::all());
        return [
            'user_progress_id' => $user_progress_data->id,
            'category_id' => $user_progress_data->category_id,
            'question_id' => $question_id = $this->faker->randomElement(Question::all()->where('category_id', $user_progress_data->category_id)->get('id')),
            'users_choice_id' => $users_choice = $this->faker->randomElement(Choice::all()->where('question_id', $question_id)->get('id')),
            'is_correct' => Choice::all()->find($users_choice)->pluck('id')
        ];
    }
}
