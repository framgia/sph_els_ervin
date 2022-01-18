<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Question;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
        $question = Question::where('category_id', $category->id)->with(['category'])->get();

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
            'image' => ['required', 'file']
        ]);

        $question = Question::create([
            'category_id' => $category->id,
            'question' => $question_data['question'],
            'slug' => Str::slug($question_data['question']),
            'image' => '/storage/' . $request->file('image')->store($this::STORAGE_PATH, 'images')
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
            'question' => ['string', Rule::unique('questions', 'question')->ignore($question->id)],
            'image' => ['image'],
        ]));

        if ($question->isClean()) {
            return $this->errorResponse('Please specify new data', 422);
        }

        if ($request->has('image')) {
            $question['image'] = '/storage/' . $request->file('image')->store($this::STORAGE_PATH, 'images');
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
