<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function index()
    {
        $loans = Loan::with(['request', 'return'])->latest()->get();
        return Inertia::render('Loan/Index', [
            'loans' => $loans
        ]);
    }

    public function create()
    {
        return Inertia::render('Loan/Create', []);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'request_date' => 'required|date',
            'status' => 'required|in:pending,approved,rejected',
        ]);

        Loan::create($request->all());

        return redirect()->route('loans.index');
    }

    public function edit($id)
    {
        $loan = Loan::findOrFail($id);

        return Inertia::render('Loan/LoanForm', [
            'loan' => $loan->load(['return', 'request', 'request.user', 'request.book',]),
        ]);
    }

    public function update(Request $request, $id)
    {
        $loan = Loan::findOrFail($id);
        $request->validate([
            'loan_date' => 'required|date',
            'due_date' => 'required|date',
        ]);

        $loan->update($request->all());

        return redirect()->route('loans.index');
    }

    public function accOrRejectRequest(Request $request, $id,)
    {
        $request->validate([
            'due_date' => 'required|date',
            'status' => 'required|in:pending,approved,rejected',
        ]);
        $loan = Loan::findOrFail($id);
        if ($request->status == "approved") {
            $loan->update([
                'status' => 'approved'
            ]);
            $newLoan = Loan::create([
                'due_date' => $request->due_date,
                'loan_date' => $loan->request_date,
                'request_id' => $loan->id,
                'is_returned' => false
            ]);
        } else if ($request->status == "rejected") {
            $loan->update([
                'status' => 'rejected'
            ]);
        }
    }

    public function destroy($id)
    {
        $loan = Loan::findOrFail($id);
        $loan->delete();

        return redirect()->route('loans.index');
    }

    public function setReturn(Request $request, $loanId)
    {
        $loan = Loan::findOrFail($loanId);

        $validated = $request->validate([
            'return_date' => 'required|date',
            'is_damaged' => 'required|boolean',
            'is_lost' => 'required|boolean',
            'is_late' => 'required|boolean',
            'damage_description' => 'nullable|string',
            'replacement_instructions' => 'nullable|string',
            'fine_amount' => 'required|numeric|min:0',
        ]);

        // Tentukan fine_type secara otomatis
        if ($validated['is_damaged']) {
            $validated['fine_type'] = 'damage';
        } elseif ($validated['is_lost']) {
            $validated['fine_type'] = 'loss';
        } elseif ($validated['is_late']) {
            $validated['fine_type'] = 'late';
        } else {
            $validated['fine_type'] = 'none';
        }

        // Buat pengembalian
        $loan->return()->create($validated);

        // Update status loan
        $loan->update([
            'is_returned' => true,
            'return_date' => $validated['return_date'],
        ]);

        return redirect()->route('loans.index')->with('success', 'Pengembalian berhasil disimpan.');
    }
}
