<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, ApiResponder;


    // string to lowercase
    // Spaces to dashes
    // Ex: Hello World -> hello-world

    protected function createSlug($title)
    {
        return str_replace(" ", "-", strtolower($title));
    }
}
