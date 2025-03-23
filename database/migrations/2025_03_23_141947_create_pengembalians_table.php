<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pengembalians', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('peminjaman_id');
            $table->date('tanggal_pengembalian');
            $table->decimal('denda', 10, 2)->default(0);
            $table->timestamps();

            $table->foreign('peminjaman_id')->references('id')->on('peminjamans')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengembalians');
    }
};
