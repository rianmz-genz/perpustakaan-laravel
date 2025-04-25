<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LoanRequest extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'book_id', 'request_date', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function loan()
    {
        return $this->hasOne(Loan::class, 'request_id');
    }
}
