<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoanController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $loans = Loan::with(['book', 'request', 'user'])->byUser(Auth::user()->id)->get();
        return $this->success($loans, 'Success');
    }
}
