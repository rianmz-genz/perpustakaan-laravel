<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;

class BookController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $books = Book::all()->map(function ($book) {
            $book->cover_image = $book->cover_image ? asset('storage/' . $book->cover_image) : null;
            return $book;
        });

        return $this->success($books, 'List of books');
    }
}
