<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [
            'category_id' => $this->faker->randomElement(Category::all()->pluck('id')),
            'question' => $this->faker->word(),
            'image' => 'default.png'
        ];
    }
}
