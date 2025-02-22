<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;

class Letter extends Model
{
    protected $guarded = [];

    protected $appends = ['has_been_read'];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender');
    }

    public function receiver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'receiver');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function letterNumber(): BelongsTo
    {
        return $this->belongsTo(LetterNumber::class);
    }

    public function dispositions(): HasMany
    {
        return $this->hasMany(Disposition::class);
    }

    public function attachment(): HasOne
    {
        return $this->hasOne(Attachment::class);
    }

    public function classification(): BelongsTo
    {
        return $this->belongsTo(Classification::class, 'classification_code', 'code');
    }

    public function getHasBeenReadAttribute()
    {
        return $this->received_date !== null;
    }

    public function scopeIncoming($query)
    {
        return $query->where('receiver', Auth::id());
    }

    public function scopeOutcoming($query)
    {
        return $query->where('sender', Auth::id());
    }

    public function comments() : MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
