<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class APIKey extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'model_id',
        'app_id',
        'secret_key',
        'expires',
        // 'total_number_of_use',
        // 'today_use',
    ];

    public function owner(): User
    {
        return User::findById($this->user_id);
    }

    public function model(): AIModel
    {
        return AIModel::findById($this->model_id);
    }
}
