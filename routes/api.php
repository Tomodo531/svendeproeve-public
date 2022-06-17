<?php

use App\Enums\FineStatusEnum;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\FineController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\PremadeFineController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WithdrawalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//All user route /user
Route::middleware(['auth', 'verified'])->prefix('/user')->controller(UserController::class)->group(function () {
    //Return current signed-in user
    Route::get('/', 'index');
    //Return a paginated list of all users
    Route::get('/all', 'getAllUsers');
    //Return all user profile info
    Route::get('/profile/{id}', 'getProfile');
    //Updates user information name and tag
    Route::patch('/update', 'updateUser');
});

//Updates a users password
Route::patch('/changePassword', [ChangePasswordController::class, 'changePassword']);

//All fine routes /fine
Route::middleware(['auth', 'verified'])->prefix('/fine')->controller(FineController::class)->group(function () {
    //Return paginate of all fines
    Route::get('/', 'index');
    //Return a users latest fines
    Route::get('/latestFines', 'getLatestFines');
    //Return top contributors
    Route::get('/topContributors', 'getTopContributors');
    //Return specific fine
    Route::get('/{id}', 'getSpecificFine');
    //Return user specific fine
    Route::get('/user/{id}', 'getUserSpecificFines');
    //Creates a new fine
    Route::post('/create', 'create')->middleware('is.admin');
    //Changes the status of a fine to pending
    Route::patch('/pay/{id}', 'setFineStatusPending')->middleware('is.recipient');
    //Changes the status of a fine to paid
    Route::patch('/confirm/{id}', 'setFineStatusPaid')->middleware('is.admin');
    //Changes the status of a fine to rejected
    Route::patch('/reject/{id}', 'setFineStatusRejected')->middleware('is.admin');
    //Deletes a fine
    Route::delete('/delete/{id}', 'delete')->middleware('is.admin');
});

//All goal routes /goal
Route::middleware(['auth', 'verified'])->prefix('/goal')->controller(GoalController::class)->group(function () {
    //Return goal and create on if there is not one
    Route::get('/', 'index');
    //Update a existing goal
    Route::put('/update', 'update')->middleware('is.admin');
});

//All premadefine routes /premadefine
Route::middleware(['auth', 'verified'])->prefix('/premadefine')->controller(PremadeFineController::class)->group(function () {
    //Return paginate of premadefines
    Route::get('/', 'index');
    //Return specific premadefines
    Route::get('/{id}', 'getSpecificPremadeFine');
    //Create premadefine
    Route::post('/create', 'create')->middleware('is.admin');
    //Update a existing fine
    Route::put('/update/{id}', 'update')->middleware('is.admin');
    //Delete premadefine
    Route::delete('/delete/{id}', 'delete')->middleware('is.admin');
});

//All balance and withdrawal route /balance
Route::middleware(['auth', 'verified'])->prefix('/balance')->group(function () {
    //Return the current balance of all fines minus withdrawn balance
    Route::get('/', [BalanceController::class, 'index']);
    //Return af paginated list of all withdrawals
    Route::get('/withdrawals', [WithdrawalController::class, 'index']);
    //Creates a withdrawal from the balance
    Route::post('/withdraw', [WithdrawalController::class, 'withdraw'])->middleware('is.admin');
    //Cancels a withdrawal
    Route::delete('/withdraw/cancel/{id}', [WithdrawalController::class, 'cancelWithdrawal'])->middleware('is.admin');
});
