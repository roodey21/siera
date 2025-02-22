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
        Schema::create('letter_numbers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('letter_type_id')->constrained()->cascadeOnDelete();
            $table->integer('number');
            $table->string('pic');
            $table->date('date');
            $table->text('description');
            $table->string('code')->nullable()->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letter_numbers');
    }
};
