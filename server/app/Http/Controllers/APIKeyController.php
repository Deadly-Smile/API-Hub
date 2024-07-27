<?php

namespace App\Http\Controllers;

use App\Models\APIKey;
use Nette\Utils\Random;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class APIKeyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(['api_keys' => APIKey::all()], 200);
    }

    public function create(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:a_i_models,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => 'validation error', 'errors' => $validator->errors()], 422);
        }
        $api_key = APIKey::create([
            'user_id' => auth()->user()->id,
            'model_id' => $request['id'],
            'app_id' => Random::generate(),
            'secret_key' => Random::generate(26),
            'expires' => now() + 3600 * 24 * 30,
        ]);

        return response()->json(['api_key' => $api_key], 201);
    }

    public function addTime(Request $request, $id): JsonResponse
    {
        $api_key = APIKey::findOrFail($id);
        if (!$api_key || $api_key?->user_id !== auth()->user()->id) {
            return response()->json(['error' => 'validation error', 'errors' => ['id' => 'invalid API key']], 422);
        }

        // needs work for calculating time

        $api_key->expires = now() + $request['time'];
        $api_key->save();
        return response()->json(['message' => 'Expaied date updated'], 200);
    }

    public function use(Request $request, $id): JsonResponse
    {
        $api_key = APIKey::findOrFail($id);
        if (!$api_key || $api_key?->user_id !== auth()->user()->id) {
            return response()->json(['error' => 'validation error', 'errors' => ['id' => 'invalid API key']], 422);
        } else if ($api_key->expires >= now()) {
            return response()->json(['error' => 'api key expired']);
        }

        // use service
        $api_key->total_number_of_use++;
        $api_key->save();
        return response()->json(['message' => 'Expaied date updated'], 200);
    }

    public function updateSecret($id): JsonResponse
    {
        $api_key = APIKey::findOrFail($id);
        if (!$api_key || $api_key?->user_id !== auth()->user()->id) {
            return response()->json(['error' => 'validation error', 'errors' => ['id' => 'invalid API key']], 422);
        } else if ($api_key->expires >= now()) {
            return response()->json(['error' => 'api key expired']);
        }

        $api_key->app_id = Random::generate();
        $api_key->secret_key = Random::generate(26);
        $api_key->save();
        return response()->json(['api_key' => $api_key], 200);
    }

    public function delete($id)
    {
        $api_key = APIKey::find($id);
        $api_key?->delete();
        return response()->json([], 204);
    }

    public function ownedAPIKeys(): JsonResponse
    {
        $user = auth()->user();
        return response()->json(['APIs' => $user->getAPIKeys], 200);
    }
}
