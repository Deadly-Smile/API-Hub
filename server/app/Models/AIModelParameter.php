<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIModelParameter extends Model
{
    use HasFactory;

    protected $fillable = [
        'model_id',
        'parameter_name',
        'file',
        'text',
        'is_file',
        'is_default',
        'is_required',
    ];

    public function model()
    {
        return $this->belongsTo(AIModel::class);
    }
}
