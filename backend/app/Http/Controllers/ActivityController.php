<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserLogs;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        return UserLogs::all();
    }

    public function show(User $user)
    {
        $data = $user->activities;

        foreach ($data as $key => $activity) {
            $data[$key]['time_diff'] = Carbon::parse($data[$key]->created_at)->diffForHumans();
        }

        return $data;
    }
}
