<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ReturnBook extends Model
{
    use HasFactory;

    protected $table = 'returns';

    protected $fillable = [
        'loan_id', 'return_date', 'is_damaged', 'is_lost', 'is_late',
        'damage_description', 'fine_amount', 'fine_type', 'replacement_instructions'
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }
}
