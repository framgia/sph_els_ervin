<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Result;
use App\Models\User;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user, Category $category)
    {
        $progress = $user->get_user_progress_by_category($category->id)->first();
        $results = Result::where([
            ['user_progress_id', $progress->id],
            ['category_id', $category->id]
        ])->get();

        return $this->showAll($results);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(User $user, Category $category, Request $request)
    {
        $data = $request->validate([
            'user_progress_id' => ['required', 'integer', 'exists:user_progress,id'],
            'questions' => ['required', 'array'],
            'questions.*' => ['required', 'integer', 'exists:questions,id'],
            'answers' => ['required', 'array'],
            'answers.*' => ['required', 'integer', 'exists:choices,id'],
            'results' => ['required', 'array'],
            'results.*' => ['required', 'boolean']
        ]);

        $results = [];
        for ($i = 0; $i < count($request->get('questions')); $i++) {
            $result['user_progress_id'] = $data['user_progress_id'];
            $result['category_id'] = $category->id;
            $result['question_id'] = $data['questions'][$i];
            $result['user_choice_id'] = $data['answers'][$i];
            $result['is_correct'] = $data['results'][$i];
            $results[] = Result::create($result);
        }

        return ($results);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Result  $result
     * @return \Illuminate\Http\Response
     */
    public function show(Result $result)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Result  $result
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Result $result)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Result  $result
     * @return \Illuminate\Http\Response
     */
    public function destroy(Result $result)
    {
        //
    }
}
