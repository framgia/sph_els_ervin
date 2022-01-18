<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadeToUserProgressTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_progress', function (Blueprint $table) {
            $table->foreignId('user_id')->onDelete('cascade')->change();
            $table->foreignId('category_id')->onDelete('cascade')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_progress', function (Blueprint $table) {
            $table->foreignId('user_id')->change();
            $table->foreignId('category_id')->change();
        });
    }
}
