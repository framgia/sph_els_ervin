<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FollowFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = $this->getTwoUserIDs();
        return [
            'follower_id' => $users[0],
            'followed_id' => $users[1],
        ];
    }

    // Returns two user IDs from the users table
    // Problems: Doesn't check for duplicate follows
    private function getTwoUserIDs()
    {
        return $this->faker->randomElements(User::all()->pluck('id'), 2, false);
    }
}
