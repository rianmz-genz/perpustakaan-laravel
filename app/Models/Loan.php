<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = ['request_id', 'loan_date', 'due_date', 'return_date', 'is_returned'];

    public function request()
    {
        return $this->belongsTo(LoanRequest::class, 'request_id');
    }

    public function return()
    {
        return $this->hasOne(ReturnBook::class); // Custom naming to avoid conflict with `return` keyword
    }
    public function user()
    {
        return $this->hasOneThrough(
            User::class,
            LoanRequest::class,
            'id',        // Foreign key on LoanRequest
            'id',        // Foreign key on User
            'request_id', // Local key on Loan
            'user_id'     // Local key on LoanRequest
        );
    }

    public function book()
    {
        return $this->hasOneThrough(
            Book::class,
            LoanRequest::class,
            'id',        // Foreign key on LoanRequest
            'id',        // Foreign key on Book
            'request_id', // Local key on Loan
            'book_id'     // Local key on LoanRequest
        );
    }
        protected $casts = [
        'is_returned' => 'boolean',
    ];
}
