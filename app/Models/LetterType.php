<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LetterType extends Model
{
    public function letterNumbers(): HasMany
    {
        return $this->hasMany(LetterNumber::class);
    }
}
