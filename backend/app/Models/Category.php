<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;
    const HIDDEN = 0;
    const VISIBLE = 1;

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function user_progress()
    {
        return $this->hasMany(UserProgress::class);
    }
}
