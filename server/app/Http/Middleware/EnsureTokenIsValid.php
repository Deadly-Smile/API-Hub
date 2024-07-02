<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('sanctum')->check()) {
            // Add your custom logic here
            $user = Auth::user();

            // Example: Check if the user is active
            if (!$user->email_verified_at) {
                return response()->json(['message' => 'User account is not verified'], 401);
            }

            // Proceed with the request
            return $next($request);
        }

        return response()->json(['message' => 'Unauthenticated'], 401);
    }
}
