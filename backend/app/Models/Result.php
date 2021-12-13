<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function user_progress()
    {
        return $this->belongsTo(UserProgress::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function users_choice()
    {
        return $this->belongsTo(Choice::class, 'users_choice_id', 'id');
    }
}
