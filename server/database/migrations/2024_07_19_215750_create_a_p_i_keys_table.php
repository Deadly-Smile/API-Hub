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
        Schema::create('a_p_i_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('model_id')->constrained('a_i_models')->onDelete('cascade');
            $table->string('app_id')->unique();
            $table->string('secret_key')->unique();
            $table->timestamp('expires');
            $table->integer('total_number_of_use')->default(0);
            $table->integer('today_use')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('a_p_i_keys');
    }
};
