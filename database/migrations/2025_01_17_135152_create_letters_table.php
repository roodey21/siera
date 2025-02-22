<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('letters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('letter_number_id')->constrained()->onDelete('cascade');
            $table->foreignId('sender')->constrained('users')->cascadeOnUpdate();
            $table->foreignId('receiver')->constrained('users')->cascadeOnUpdate();
            $table->date('date')->nullable();
            $table->date('received_date')->nullable();
            $table->text('summary')->nullable();
            $table->text('note')->nullable();
            $table->string('type')->default('incoming')->comment('Surat Masuk (incoming)/Surat Keluar (outgoing)');
            $table->string('classification_code');
            $table->foreign('classification_code')->references('code')->on('classifications');
            $table->foreignId('user_id')->constrained('users')->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letters');
    }
};
