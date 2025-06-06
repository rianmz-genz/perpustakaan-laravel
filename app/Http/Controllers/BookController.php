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
            'id' => 'nullable|exists:books,id',
            'title' => 'required|string',
            'author' => 'required|string|max:100',
            'publisher' => 'required|string|max:100',
            'year_published' => 'required|digits:4|integer',
            'total_stock' => 'required|integer|min:0',
            'available_stock' => 'required|integer|min:0',
            'cover_image' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'author', 'publisher', 'year_published', 'total_stock', 'available_stock']);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        if ($request->filled('id')) {
            // UPDATE
            $book = Book::findOrFail($request->id);
            $book->update($data);
        } else {
            // CREATE
            Book::create($data);
        }

        return redirect()->route('books.index')->with('success', 'Book saved successfully.');
    }


    public function update(Request $request, Book $book)
    {
        // dd($request->all());
        $request->validate([
            'title' => 'required|string',
            'author' => 'required|string|max:100',
            'publisher' => 'required|string|max:100',
            'year_published' => 'required|digits:4|integer',
            'total_stock' => 'required|integer|min:0',
            'available_stock' => 'required|integer|min:0',
            'cover_image' => 'nullable|image|max:2048', // validasi cover
        ]);

        $data = $request->only(['title', 'author', 'publisher', 'year_published', 'total_stock', 'available_stock']);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('covers', 'public');
        }

        $book->update($data);

        return redirect()->route('books.index');
    }


    public function edit(Book $book)
    {
        return Inertia::render('Book/Create', [
            'book' => $book
        ]);
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index');
    }
}
