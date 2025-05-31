<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LoanRequest;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoanRequestController extends Controller
{
    use ApiResponse;

    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|exists:books,id',
            'request_date' => 'required|date',
        ]);

        $data = $request->only(['book_id', 'request_date']);
        $data['user_id'] = Auth::user()->id;
        $data['status'] = 'pending';

        LoanRequest::create($data);

        return $this->success([], 'Berhasil membuat permintaan peminjaman');
    }

    public function index()
    {
        $loanRequests = LoanRequest::where('user_id', Auth::user()->id)->with(['user','book','loan','loan.return'])->get()->map(function ($loanRequest) {
            $loanRequest->book->cover_image = $loanRequest->book->cover_image ? asset('storage/' . $loanRequest->book->cover_image) : null;
            return $loanRequest;
        });
        return $this->success($loanRequests, 'Success');
    }
}
