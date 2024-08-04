<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ModelController;
use App\Http\Controllers\PredictController;

Route::post('/predict', [PredictController::class, 'guessAnimel']);

Route::middleware('web')->group(function () {
    Route::get('auth/{provider}/redirect', [AuthController::class, 'redirectToProvider']);
    Route::get('auth/{provider}/callback', [AuthController::class, 'handleProviderCallback']);
});

Route::get('/user', [AuthController::class, 'me'])->middleware('auth:sanctum');
Route::get('/user/role', [AuthController::class, 'getUserRole'])->middleware('auth:sanctum');
Route::get('/user/{id}', [AuthController::class, 'getUserById']);
Route::get('users', [UserController::class, 'index']);
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::put('/verify/email/{id}', [AuthController::class, 'verifyMail']);

Route::group(['prefix' => 'model'], function () {
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/upload-model', [ModelController::class, 'createOrUpdateModel']);
        Route::post('/upload-test-image/{id}', [ModelController::class, 'uploadTestImage']);
        Route::post('/upload-python-script/{id}', [ModelController::class, 'uploadPythonScript']);
        Route::post('/upload-document/{id}', [ModelController::class, 'uploadDocumentation']);
        Route::delete('/delete-model/{id}', [ModelController::class, 'deleteModel']);
        Route::post('/update-model-file/{id}', [ModelController::class, 'updateModelFile']);
        Route::put('/update-name/{id}/{name}', [ModelController::class, 'updateName']);
    });

    Route::post('/predict-model/{id}', [ModelController::class, 'predictModel']);
    Route::get('/get-model', [ModelController::class, 'getModel']);
    Route::get('/get-code-snippet', [ModelController::class, 'getDefaultScript']);
});
// todo: learn unit testing
Route::group(['prefix' => 'test'], function () {
    Route::get('/get-model', [TestController::class, 'getModel']);
    Route::get('/get-parameter', [TestController::class, 'getParameter']);
});
