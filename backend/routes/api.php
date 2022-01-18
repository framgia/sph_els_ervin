<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChoiceController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProgressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('users', UserController::class)->only(['index', 'show']);
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('categories/{category:slug}/questions', QuestionController::class)->only(['index', 'show']);
    Route::apiResource('categories/{category:slug}/questions/{question:id}/choices', ChoiceController::class)->only(['index', 'show']);;
    Route::get('categories/{category:slug}/choices', [ChoiceController::class, 'choices']);
    Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
    Route::apiResource('follows', FollowController::class)->only('index', 'store');
    Route::get('follows/{user}/following', [FollowController::class, 'following']);
    Route::get('follows/{user}/followers', [FollowController::class, 'followers']);
    Route::put('users/{user}', [UserController::class, 'update']);
    Route::delete('follows', [FollowController::class, 'destroy']);

    Route::get('users/{user}/progress', [UserProgressController::class, 'fullStatus']);
    Route::apiResource('users/{user}/{category}/progress', UserProgressController::class);
    Route::apiResource('users/{user}/{category}/results', ResultController::class);
    Route::get('activities', [ActivityController::class, 'index']);
    Route::get('activities/{user}', [ActivityController::class, 'show']);
    Route::get('users/{user}/words', [UserController::class, 'words']);
});

Route::group(['middleware' => ['auth:sanctum', 'abilities:admin']], function () {
    Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    Route::apiResource('categories/{category:slug}/questions', QuestionController::class)->except(['index', 'show']);
    Route::apiResource('categories/{category:slug}/questions/{question:id}/choices', ChoiceController::class)->except(['index', 'show']);
});
