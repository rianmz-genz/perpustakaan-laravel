<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Loan;
use App\Models\LoanRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanRequestController extends Controller
{
    public function index()
    {
        $loanRequests = LoanRequest::with(['user', 'book', 'loan'])->latest()->get();
        return Inertia::render('LoanRequest/Index', [
            'loanRequests' => $loanRequests
        ]);
    }

    public function create()
    {
        return Inertia::render('LoanRequest/Create', [
            'books' => Book::all(),
            'users' => User::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'request_date' => 'required|date',
            'status' => 'required|in:pending,approved,rejected',
        ]);

        LoanRequest::create($request->all());

        return redirect()->route('loanrequests.index');
    }

    public function edit($id)
    {
        $loanRequest = LoanRequest::findOrFail($id); 

        return Inertia::render('LoanRequest/Create', [
            'loanRequest' => $loanRequest->load(['user', 'book']),
            'books' => Book::all(),
            'users' => User::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $loanRequest = LoanRequest::findOrFail($id); 
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'request_date' => 'required|date',
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $loanRequest->update($request->all());

        return redirect()->route('loanrequests.index');
    }

    public function accOrRejectRequest(Request $request, $id,) {
         $request->validate([
            'due_date' => 'sometimes|date',
            'status' => 'required|in:pending,approved,rejected',
        ]);
        $loanRequest = LoanRequest::findOrFail($id); 
        if($request->status == "approved") {
            $loanRequest->update([
                'status' => 'approved'
            ]);
            $newLoan = Loan::create([
                'due_date' => $request->due_date,
                'loan_date' => $loanRequest->request_date,
                'request_id' => $loanRequest->id,
                'is_returned' => false
            ]);

        } else if($request->status == "rejected") {
            $loanRequest->update([
                'status' => 'rejected'
            ]);
        }
    }

    public function destroy($id)
    {
        $loanRequest = LoanRequest::findOrFail($id); 
        $loanRequest->delete();

        return redirect()->route('loanrequests.index');
    }
}
