<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Pengembalian extends Model {
    use HasFactory;

    protected $fillable = ['id', 'peminjaman_id', 'tanggal_pengembalian', 'denda'];
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot() {
        parent::boot();
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function peminjaman(): BelongsTo {
        return $this->belongsTo(Peminjaman::class);
    }
}
