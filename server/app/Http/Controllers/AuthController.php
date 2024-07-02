<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Jobs\SendUserVarifyMail;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function redirectToProvider($provider)
    {
        return response()->json(['url' => Socialite::driver($provider)->redirect()->getTargetUrl()]);
    }

    public function handleProviderCallback($provider)
    {
        try {
            $user = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $authUser = $this->loginOrCreateUser($user, $provider);

        $token = $authUser->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    protected function loginOrCreateUser($providerUser, $provider): JsonResponse
    {
        $user = User::firstOrCreate(
            ['email' => $providerUser->getEmail()],
            [
                'name' => $providerUser->getName(),
                'password' => Hash::make(Str::random(24)),
                'provider_id' => $providerUser->getId(),
                'provider' => $provider,
            ]
        );

        return response()->json(['user' => $user]);
    }

    /**
     * This way is getting old, from now have to use defalut sanctum authentication
     */
    // public function login(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');
    //     try {
    //         if (!$token = JWTAuth::attempt($credentials)) {
    //             return response()->json(['message' => 'Invalid credentials'], 401);
    //         }

    //         // Get the authenticated user
    //         $user = JWTAuth::user();
    //         if (!$user->email_verified_at) {
    //             return response()->json(['message' => 'Invalid credentials'], 401);
    //         }
    //         return $this->respondWithToken($token);
    //         // return response()->json(['token' => $token], 200);
    //     } catch (JWTException $e) {
    //         // return $e;
    //         return response()->json(['message' => 'Could not create token'], 500);
    //     }
    // }

    public function me(): JsonResponse
    {
        return response()->json(auth()->user());
    }

    public function getUserRole(): JsonResponse
    {
        return response()->json(Role::findOrFail(auth()->user()->role_id));
    }

    public function getUserById($id): JsonResponse
    {
        return response()->json(User::findOrFail($id));
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255|exists:users',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => 'validation error', 'errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        } else {
            return $this->respondWithToken($user->createToken('authToken')->plainTextToken);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => 'validation error', 'errors' => $validator->errors()], 422);
        }

        $randomNum = random_int(100000, 999999);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role_id' => Role::where('slug', 'subscriber')->first()->id,
            'mail_token' => $randomNum,
        ]);

        $mailData = [
            "name" => $request["name"],
            "link" => env('WEB_URL') . "/verify-user/" . $user->id,
            "sixDigitNumber" => $randomNum,
        ];

        // send mail
        dispatch(new SendUserVarifyMail(["send-to" => $user->email, "data" => $mailData]));
        return response()->json(['message' => 'Registered successfully, now please verify your email'], 201);
    }

    public function logout(Request $request)
    {
        // JWTAuth::invalidate(JWTAuth::getToken());
        $request->user()->currentAccessToken()->delete();
        return response()->json(204);
        // return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
        ]);
    }

    public function verifyMail(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($user) {
            if ($user->mail_token === $request['code']) {
                $user->mail_token = null;
                $user->email_verified_at = now();
                $user->save();
                $token = $user->createToken('authToken')->plainTextToken;

                return $this->respondWithToken($token);
            } else {
                return response()->json(['message' => "Wrong verification code"], 400);
            }
        } else {
            return response()->json(['message' => "Invalid user"], 400);
        }
    }
}
