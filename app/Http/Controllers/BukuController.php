<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BukuController extends Controller
{
    public function index()
    {
        $listBuku = Buku::all();
        return Inertia::render('Buku/Index', [
            'listBuku' => $listBuku
        ]);
    }
}
