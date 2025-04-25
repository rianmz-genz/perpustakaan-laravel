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
}
