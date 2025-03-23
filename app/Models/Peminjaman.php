<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Peminjaman extends Model {
    use HasFactory;

    protected $fillable = ['id', 'user_id', 'buku_id', 'tanggal_pinjam', 'tanggal_kembali', 'status'];
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot() {
        parent::boot();
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function buku(): BelongsTo {
        return $this->belongsTo(Buku::class);
    }

    public function pengembalian(): HasOne {
        return $this->hasOne(Pengembalian::class);
    }
}

