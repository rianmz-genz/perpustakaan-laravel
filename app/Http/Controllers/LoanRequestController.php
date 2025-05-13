<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\LoanRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanRequestController extends Controller
{
    public function index()
    {
        $loanRequests = LoanRequest::with(['user', 'book'])->latest()->get();
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
        $loanRequest = LoanRequest::findOrFail($id); // Bisa juga withTrashed() jika pakai soft delete

        return Inertia::render('LoanRequest/Create', [
            'loanRequest' => $loanRequest->load(['user', 'book']),
            'books' => Book::all(),
            'users' => User::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $loanRequest = LoanRequest::findOrFail($id); // Bisa juga withTrashed() jika pakai soft delete
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'request_date' => 'required|date',
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $loanRequest->update($request->all());

        return redirect()->route('loanrequests.index');
    }

    public function destroy($id)
    {
        $loanRequest = LoanRequest::findOrFail($id); // Bisa juga withTrashed() jika pakai soft delete
        $loanRequest->delete();

        return redirect()->route('loanrequests.index');
    }
}
