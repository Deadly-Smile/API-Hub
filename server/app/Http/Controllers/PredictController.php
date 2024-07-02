<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\Process\Process;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Process\Exception\ProcessFailedException;

class PredictController extends Controller
{
    public function guessAnimel(Request $request): JsonResponse
    {
        // Validate the input data
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            // 'model' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'validation error', 'errors' => $validator->errors()], 422);
        }

        $image = $request->file('image');
        $imagePath = $image->store('uploads', 'public');

        $modelPath = base_path("public/models/model.keras");

        // Note the 'storage/app/public' prefix
        $fullImagePath = storage_path('app/public/' . $imagePath);

        // Correct path to the Python script
        $scriptPath = base_path('public/scripts/script1.py');

        $process = new Process(['python3', $scriptPath, $modelPath, $fullImagePath]);
        $process->run();

        // Check if the process was successful
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        // Get the prediction result from the output
        $output = $process->getOutput();

        if (preg_match('/\{.*\}/s', $output, $matches)) {
            $jsonOutput = $matches[0];
            $prediction = json_decode($jsonOutput, true);
        } else {
            $prediction = null;
        }

        return response()->json([
            'prediction' => $prediction['prediction'] ?? null
        ]);
    }

    // public function uploadModel(Request $request): JsonResponse
    // {
    //     $validator = Validator::make($request->all(), [

    //     ])
    // }
}
