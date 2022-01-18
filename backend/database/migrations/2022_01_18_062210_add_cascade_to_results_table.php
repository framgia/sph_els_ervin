<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadeToResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('results', function (Blueprint $table) {
            $table->foreignId('user_progress_id')->onDelete('cascade')->change();
            $table->foreignId('category_id')->onDelete('cascade')->change();
            $table->foreignId('question_id')->onDelete('cascade')->change();
            $table->foreignId('user_choice_id')->onDelete('cascade')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('results', function (Blueprint $table) {
            $table->foreignId('user_progress_id')->onDelete('cascade')->change();
            $table->foreignId('category_id')->change();
            $table->foreignId('question_id')->change();
            $table->foreignId('user_choice_id')->change();
        });
    }
}
