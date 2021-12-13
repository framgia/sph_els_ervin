<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    use HasFactory;

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function category()
    {
        $this->belongsTo(Category::class);
    }

    public function results()
    {
        $this->hasMany(Result::class);
    }
}
