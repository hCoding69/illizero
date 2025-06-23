<?php

use App\Http\Controllers\api\CentralAuthController;
use App\Http\Controllers\api\TenantAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

    Route::post('/register', [CentralAuthController::class, 'registerCompany'])
        ->name('register.company')
        ->middleware('api');
    Route::post('/login', [TenantAuthController::class, 'login']);
