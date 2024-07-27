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
        Schema::create('a_i_model_parameters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('model_id')->constrained('a_i_models')->onDelete('cascade');
            $table->string('parameter_name');
            $table->string('file')->nullable();
            $table->text('text')->nullable();
            $table->boolean('is_file')->default(false);
            $table->boolean('is_default')->default(false);
            $table->boolean('is_required')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('a_i_model_parameters');
    }
};
