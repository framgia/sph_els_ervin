<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadeToFollowsTable extends Migration
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
    }
}
