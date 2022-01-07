<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->showAll(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category_data = $request->validate([
            'title' => ['required', 'string', 'unique:categories,title'],
            'description' => ['required', 'string']
        ]);

        $category = Category::create([
            'title' => $category_data['title'],
            'description' => $category_data['description'],
<<<<<<< HEAD
            'slug' => Str::slug($category_data['title'])
=======
            'slug' => $this->createSlug($category_data['title'])
>>>>>>> [SELS-TASK] Create API Endpoints: Categories & Questions
        ]);

        return $this->showOne($category);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return $this->showOne($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $category->fill($request->validate([
            'title' => ['string', 'unique:categories,title,' . $category->title],
            'description' => ['string']
        ]));

        if ($category->isClean()) {
            return $this->errorResponse('Please specify new data', 422);
        }

        $category->save();

        return $this->showOne($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return $this->showOne($category);
    }
}
