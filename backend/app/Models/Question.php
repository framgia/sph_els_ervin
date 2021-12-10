<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public function choices()
    {
        return $this->hasMany(Choice::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
