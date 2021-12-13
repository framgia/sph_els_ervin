<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserProgressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->randomElement(User::all()->pluck('id')),
            'category_id' => $this->faker->randomElement(Category::all()->pluck('id')),
            'status' => 0,
        ];
    }
}
