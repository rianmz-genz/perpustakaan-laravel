<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {

        // Mahasiswa
        Schema::create('mahasiswas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('nim', 20);
            $table->string('fakultas', 100);
            $table->string('prodi', 100);
            $table->year('angkatan');
            $table->timestamps();
        });

        // Books
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author', 100);
            $table->string('publisher', 100);
            $table->year('year_published');
            $table->integer('total_stock');
            $table->integer('available_stock');
            $table->string('cover_image')->nullable(); // Tambahkan ini
            $table->timestamps();
        });

        // Loan Requests
        Schema::create('loan_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            $table->date('request_date');
            $table->enum('status', ['pending', 'approved', 'rejected']);
            $table->timestamps();
        });

        // Loans
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id')->constrained('loan_requests')->onDelete('cascade');
            $table->date('loan_date');
            $table->date('due_date');
            $table->date('return_date')->nullable();
            $table->boolean('is_returned');
            $table->timestamps();
        });

        // Returns
        Schema::create('returns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('loan_id')->constrained()->onDelete('cascade');
            $table->date('return_date');
            $table->boolean('is_damaged')->default(false);
            $table->boolean('is_lost')->default(false);
            $table->boolean('is_late')->default(false);
            $table->text('damage_description')->nullable();
            $table->decimal('fine_amount', 10, 2)->default(0);
            $table->enum('fine_type', ['damage', 'loss', 'late', 'none'])->default('none');
            $table->text('replacement_instructions')->nullable();
            $table->timestamps();
        });

        // Notifications
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('returns');
        Schema::dropIfExists('loans');
        Schema::dropIfExists('loan_requests');
        Schema::dropIfExists('books');
        Schema::dropIfExists('mahasiswas');
    }
};