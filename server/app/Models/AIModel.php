<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIModel extends Model
{
    use HasFactory;

    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        // 'script_file',
        // 'doc_file',
        'status',
    ];

    public function parameters()
    {
        return $this->hasMany(AIModelParameter::class, 'model_id');
    }
}
