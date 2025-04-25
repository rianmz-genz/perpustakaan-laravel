<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        return Inertia::render('Book/Index', [
            'books' => Book::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Book/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'author' => 'required|string|max:100',
            'publisher' => 'required|string|max:100',
            'year_published' => 'required|digits:4|integer',
            'total_stock' => 'required|integer|min:0',
            'available_stock' => 'required|integer|min:0',
        ]);

        Book::create($request->all());

        return redirect()->route('books.index');
    }

    public function edit(Book $book)
    {
        return Inertia::render('Book/Create', [
            'book' => $book
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required|string',
            'author' => 'required|string|max:100',
            'publisher' => 'required|string|max:100',
            'year_published' => 'required|digits:4|integer',
            'total_stock' => 'required|integer|min:0',
            'available_stock' => 'required|integer|min:0',
        ]);

        $book->update($request->all());

        return redirect()->route('books.index');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index');
    }
}
