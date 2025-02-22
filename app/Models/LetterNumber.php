<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LetterNumber extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['status'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($letterNumber) {
            $letterNumber->generateCode();
        });
    }

    public function casts()
    {
        return [
            'date' => 'date:Y-m-d'
        ];
    }

    public function generateCode()
    {
        $letterTypeCode = $this->letterType ? $this->letterType->name : 'UNKNOWN';
        $year = $this->date->format('Y');
        $lastNumber = $this->letterType ? $this->letterType->letterNumbers()->whereYear('date', $year)->max('number') : 0;
        $monthCode = $this->date ? $this->konversiBulanKeRomawi(Carbon::parse($this->date)->format('n')) : 'UNKNOWN';

        $this->code = sprintf(
            'No. %s/%s/%s/%s',
            str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT),
            $letterTypeCode,
            $monthCode,
            $year
        );
        $this->number = $lastNumber + 1;
    }

    public function letterType(): BelongsTo
    {
        return $this->belongsTo(LetterType::class);
    }

    private function konversiBulanKeRomawi($nomorBulan)
    {
        $romawi = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
        return isset($romawi[$nomorBulan - 1]) ? $romawi[$nomorBulan - 1] : 'UNKNOWN';
    }

    public function letters()
    {
        return $this->hasMany(Letter::class);
    }

    public function getStatusAttribute()
    {
        return $this->letters_count > 0 ? 'used' : 'unused';
    }
}
