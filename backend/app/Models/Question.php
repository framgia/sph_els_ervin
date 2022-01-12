<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use HasFactory, SoftDeletes;

    const DEFAULT_IMAGE = '/storage/questions/default.png';

    public function getRouteKeyName()
    {
        return 'slug';
    }

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
