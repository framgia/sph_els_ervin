<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;

class ChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // Can't remove the category parameter due to how the url works, might be wrong
    public function index(Category $category, Question $question)
    {
        return $this->showAll($question->choices);
    }

    public function choices(Category $category)
    {
        $choices = array();

        foreach ($category->questions as $question) {
            $choices[] = $question->choices;
        }

        $collection = collect($choices);

        return $this->showAll($collection);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Category $category, Question $question, Request $request)
    {
        $data = $request->validate([
            'choices' => ['array', 'required'],
            'choices.*.is_correct' => ['required', 'boolean'],
            'choices.*.choice' => ['required', 'string', 'distinct']
        ])['choices']; // Take choices out of brackets
        foreach ($data as $index => $choice) {
            $data[$index]["question_id"] = $question->id;
        }

        $choices = Choice::create($data);

        return $choices;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Choice  $choice
     * @return \Illuminate\Http\Response
     */

    // Same as above due to the other dynamic fields these other parameters are required
    public function show(Category $category, Question $question, Choice $choice)
    {
        return $choice;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Choice  $choice
     * @return \Illuminate\Http\Response
     */
    public function update(Category $category, Question $question, Choice $choice, Request $request)
    {
        $choice->fill($request->validate([
            'choice' => 'string',
            'is_correct' => 'boolean'
        ]));

        $choice->save();

        return $choice;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Choice  $choice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category, Question $question, Choice $choice)
    {
        $choice->delete();

        return $choice;
    }
}
