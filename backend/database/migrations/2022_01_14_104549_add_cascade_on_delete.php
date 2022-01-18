<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadeOnDelete extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('follows', function (Blueprint $table) {
            $table->foreignId('follower_id')->onDelete('cascade')->change();
            $table->foreignId('following_id')->onDelete('cascade')->change();
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->foreignId('category_id')->onDelete('cascade')->change();
        });

        Schema::table('choices', function (Blueprint $table) {
            $table->foreignId('question_id')->onDelete('cascade')->change();
        });

        Schema::table('user_progress', function (Blueprint $table) {
            $table->foreignId('user_id')->onDelete('cascade')->change();
            $table->foreignId('category_id')->onDelete('cascade')->change();
        });

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
        Schema::table('follows', function (Blueprint $table) {
            $table->foreignId('follower_id')->change();
            $table->foreignId('following_id')->change();
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->foreignId('category_id')->change();
        });

        Schema::table('choices', function (Blueprint $table) {
            $table->foreignId('question_id')->change();
        });

        Schema::table('user_progress', function (Blueprint $table) {
            $table->foreignId('user_id')->change();
            $table->foreignId('category_id')->change();
        });

        Schema::table('results', function (Blueprint $table) {
            $table->foreignId('user_progress_id')->onDelete('cascade')->change();
            $table->foreignId('category_id')->change();
            $table->foreignId('question_id')->change();
            $table->foreignId('user_choice_id')->change();
        });
    }
}
