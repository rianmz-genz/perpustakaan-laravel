<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Buku extends Model {
    use HasFactory;

    protected $fillable = ['id', 'judul', 'penulis', 'penerbit', 'tahun_terbit', 'isbn', 'stok'];
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot() {
        parent::boot();
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function peminjaman(): HasMany {
        return $this->hasMany(Peminjaman::class);
    }

    public function histori(): HasMany {
        return $this->hasMany(Histori::class);
    }
}

