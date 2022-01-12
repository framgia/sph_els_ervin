<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class FollowController extends Controller
{
    public function index()
    {
        return $this->showAll(Follow::all());
    }

    public function store()
    {
        $data = request()->validate(
            [
                'follower' => ['required', 'integer'],
                'following' => ['required', 'integer']
            ]
        );

        // Check if already following
        $checkDuplicate = Follow::where('follower_id', $data['follower'])->where('following_id', $data['following'])->get();
        if (count($checkDuplicate) > 0) {
            return $this->errorResponse('Already following!', 500);
        }

        $follow = Follow::create(
            [
                'follower_id' => $data['follower'],
                'following_id' => $data['following']
            ]
        );

        return response($follow, 201);
    }

    public function show($user)
    {
        return Follow::where('follower_id', $user)->get();
    }

    public function destroy()
    {
        $data = request()->validate(
            [
                'follower' => ['required', 'integer'],
                'following' => ['required', 'integer']
            ]
        );

        $follow = Follow::all()->where('follower_id', $data['follower'])->where('following_id', $data['following'])->first();
        $follow->delete();
        return response($follow, 201);
    }
}
