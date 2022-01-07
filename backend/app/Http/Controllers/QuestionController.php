<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class QuestionController extends Controller
{
    const STORAGE_PATH = 'public/questions';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Category $category)
    {
        $question = Question::with(['category' => function ($query) use ($category) {
            $query->where('id', $category->id);
        }])->get();
        return $this->showAll($question);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreQuestionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Category $category, Request $request)
    {
        $question_data = $request->validate([
            'question' => ['required', 'string'],
            'image' => ['required', 'file'],
        ]);

        $question = Question::create([
            'category_id' => $category->id,
            'question' => $question_data['question'],
            'slug' => Str::slug($question_data['question']),
            'image' => $request->file('image')->store($this::STORAGE_PATH)
        ]);

        return $this->showOne($question);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category, Question $question)
    {
        return $this->showOne($question);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateQuestionRequest  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        $question->fill($request->validate([
            'question' => ['string'],
            'image' => ['file'],
        ]));

        if ($question->isClean()) {
            return $this->errorResponse('Please specify new data', 422);
        }

        if ($question['image']->isDirty()) {
            $request->file('image')->store($this->STORAGE_PATH);
        }

        $question->save();

        return $this->showOne($question);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->delete();

        return $this->showOne($question);
    }
}
