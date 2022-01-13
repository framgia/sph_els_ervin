<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::resource('categories', CategoryController::class);
    Route::resource('categories.questions', QuestionController::class);
    Route::resource('results', ResultController::class);
    Route::resource('progress', UserProgressController::class);
    Route::resource('follows', FollowController::class)->only('index', 'store');
    Route::get('follows/{user}/following', [FollowController::class, 'following']);
    Route::get('follows/{user}/followers', [FollowController::class, 'followers']);
    Route::put('users/{user}', [UserController::class, 'update']);
    Route::delete('follows', [FollowController::class, 'destroy']);
});
