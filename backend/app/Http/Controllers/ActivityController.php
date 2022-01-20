<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserLogs;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ActivityController extends Controller
{
    public function index()
    {
        $data = UserLogs::orderBy('created_at', 'desc')->get();

        foreach ($data as $key => $activity) {
            $data[$key]['time_diff'] = Carbon::parse($data[$key]->created_at)->diffForHumans();
        }

        return $data;
    }

    public function show(User $user)
    {
        $data = collect($user->activities->sortByDesc('created_at'));

        $data = $data->keys()->map(function ($key) use ($data) {
            $data[$key]['time_diff'] = Carbon::parse($data[$key]->created_at)->diffForHumans();
            return $data[$key];
        });

        return $data;
    }
}
