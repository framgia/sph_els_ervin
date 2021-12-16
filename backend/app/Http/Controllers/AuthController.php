<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate Form Data
        $user_data = $request->validate([
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'name' => ['required', 'string'],
            'password' => ['required', 'string', 'confirmed']
        ]);

        // Create the user
        $user = User::create([
            'name' => $user_data['name'],
            'email' => $user_data['email'],
            'password' => bcrypt($user_data['password']) //Encrypt password
        ]);

        $token = $user->createToken('els_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }
}