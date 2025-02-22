<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Disposition extends Model
{
    protected $guarded = [];

    public function letter(): BelongsTo
    {
        return $this->belongsTo(Letter::class);
    }
}
