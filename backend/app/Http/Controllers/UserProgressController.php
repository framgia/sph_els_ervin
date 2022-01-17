<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class UserProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user, Category $category)
    {
        $progress = UserProgress::where([
            ['user_id', $user->id],
            ['category_id', $category->id]
        ])->first();

        return $progress;
    }

    public function fullStatus(User $user)
    {
        return $this->showAll(UserProgress::where('user_id', $user->id)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(User $user, Category $category, Request $request)
    {
        $progress = UserProgress::create(['user_id' => $user->id, 'category_id' => $category->id]);
        return $progress;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserProgress  $userProgress
     * @return \Illuminate\Http\Response
     */
    public function show(User $user, Category $category, UserProgress $progress)
    {
        return $this->showOne($progress);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserProgress  $userProgress
     * @return \Illuminate\Http\Response
     */
    public function update(User $user, Category $category, UserProgress $progress, Request $request)
    {
        $progress->fill($request->validate([
            'status' => ['integer']
        ]));

        $progress->save();
        return $progress;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserProgress  $userProgress
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserProgress $userProgress)
    {
        //
    }
}
