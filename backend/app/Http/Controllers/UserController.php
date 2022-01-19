<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{

    public function index()
    {
        return User::all();
    }

    public function show(User $user)
    {
        return $this->showOne($user);
    }

    public function update(Request $request, User $user)
    {
        $oldAvatar = $user->avatar;
        $user->fill($request->validate([
            'email' => ['email', Rule::unique('users', 'email')->ignore($user->id)],
            'name' => ['string'],
            'avatar' => ['image'],
        ]));

        if ($request->has('old_password')) {
            if (Hash::check($request->get('old_password'), $user->password)) {
                $user->password = Hash::make($request->get('new_password'));
            }
        }

        if ($user->isClean()) {
            return $this->errorResponse('Please specify new data', 422);
        }

        if ($request->hasFile('avatar')) {
            if ($oldAvatar !== User::DEFAULT_AVATAR)
                Storage::disk('images')->delete(substr($oldAvatar, 9));
            $user->avatar = '/storage/' . $request->file('avatar')->store('avatars', 'images');
        }

        $user->save();

        return $this->showOne($user);
    }

    public function words(User $user)
    {
        return ($user->user_progress->where('status', '!=', '-1')->pluck('status')->sum());
    }
}
