<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->hasOne(Category::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }

    public function user_log()
    {
        return $this->morphOne(UserLogs::class, 'loggable');
    }
}
