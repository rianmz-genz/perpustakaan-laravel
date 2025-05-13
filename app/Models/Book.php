<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author', 'publisher', 'year_published', 'total_stock', 'available_stock', 'cover_image'];

    public function loanRequests()
    {
        return $this->hasMany(LoanRequest::class);
    }
}
