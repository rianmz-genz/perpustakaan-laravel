<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\LoanController;
use App\Http\Controllers\Api\LoanRequestController;

// ==============================
// Public Routes
// ==============================

Route::post('/login', [AuthController::class, 'login']);

// ==============================
// Protected Routes (auth:sanctum)
// ==============================

Route::middleware('auth:sanctum')->group(function () {
    // Get current user
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Book routes
    Route::get('/books', [BookController::class, 'index']);
    Route::post('/loanrequests', [LoanRequestController::class, 'store']);
    Route::get('/loanrequests', [LoanRequestController::class, 'index']);
    Route::get('/loans', [LoanController::class, 'index']);
});
