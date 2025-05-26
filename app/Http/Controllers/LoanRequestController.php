<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Loan;
use App\Models\LoanRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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


    public function accOrRejectRequest(Request $request, $id)
    {
        $request->validate([
            'due_date' => 'required_if:status,approved|date',
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $loanRequest = LoanRequest::findOrFail($id);

        if ($loanRequest->status !== 'pending') {
            return back()->withErrors([
                'message' => 'Loan request has already been processed.',
            ]);
        }

        if ($request->status === 'approved') {
            $book = Book::findOrFail($loanRequest->book_id);

            if ($book->available_stock <= 0) {
                return back()->withErrors([
                    'message' => 'Book is out of stock.',
                ]);
            }

            DB::transaction(function () use ($loanRequest, $book, $request) {
                $loanRequest->update([
                    'status' => 'approved',
                ]);

                $book->decrement('available_stock');

                Loan::create([
                    'request_id' => $loanRequest->id,
                    'loan_date' => $loanRequest->request_date,
                    'due_date' => $request->due_date,
                    'is_returned' => false,
                ]);
            });

            return back()->with('success', 'Loan approved successfully.');
        }

        if ($request->status === 'rejected') {
            $loanRequest->update([
                'status' => 'rejected',
            ]);

            return back()->with('success', 'Loan request rejected.');
        }

        return back();
    }



    public function destroy($id)
    {
        $loanRequest = LoanRequest::findOrFail($id);
        $loanRequest->delete();

        return redirect()->route('loanrequests.index');
    }
}
