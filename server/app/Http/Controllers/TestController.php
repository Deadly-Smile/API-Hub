<?php

namespace App\Http\Controllers;

use App\Models\AIModel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
    public function getModel(Request $request): JsonResponse
    {
        $models = AIModel::all();
        foreach ($models as $model) {
            $model->parameters = $model->parameters()->get();
        }
        return response()->json([$models]);
    }
}
