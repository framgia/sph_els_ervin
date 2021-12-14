<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Choice;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Category::factory()
            ->count(10)
            ->has(
                Question::factory()
                    ->count(10)
                    ->has(
                        Choice::factory()
                            ->count(4)
                            ->state(new Sequence(
                                ['is_correct' => true],
                                ['is_correct' => false],
                                ['is_correct' => false],
                                ['is_correct' => false]
                            ))
                    )
            )->create();
        User::factory(10)->create();
    }
}
