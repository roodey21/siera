<?php

use App\Http\Controllers\LetterCommentController;
use App\Http\Controllers\LetterComposeController;
use App\Http\Controllers\LetterNumberController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserManagementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');

    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/letter-number', [LetterNumberController::class, 'index'])->name('letter-number.index');
    Route::post('/letter-number/store', [LetterNumberController::class, 'store'])->name('letter-number.store');

    Route::get('/inbox', [LetterComposeController::class, 'index'])->name('letter.inbox');
    Route::get('/inbox/{letter}', [LetterComposeController::class, 'show'])->name('letter.show');

    Route::get('/sent', [LetterComposeController::class, 'sent'])->name('letter.sent');
    Route::get('/sent/{letter}', [LetterComposeController::class, 'show'])->name('letter.sent.show');
    Route::get('/sent/{letter}/edit', [LetterComposeController::class, 'edit'])->name('letter.sent.edit');
    Route::post('/sent/{letter}/update', [LetterComposeController::class, 'update'])->name('letter.sent.update');
    Route::post('/sent/{letter}/comment/store', [LetterComposeController::class, 'storeComment'])->name('letter.sent.comment.store');
    Route::get('/sent/{letter}/comments', [LetterCommentController::class, 'getComments'])->name('letter.comments');

    Route::get('/compose', [LetterComposeController::class, 'create'])->name('letter.compose.create');
    Route::post('/compose/store', [LetterComposeController::class, 'store'])->name('letter.compose.store');

    Route::get('/letter-number/generate-document', [LetterNumberController::class, 'generateDocument'])->name('letter-number.generate-document');

    Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
    Route::post('/users/create', [UserManagementController::class, 'store'])->name('users.store');
    Route::post('/users/{user}/update', [UserManagementController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}/delete', [UserManagementController::class, 'destroy'])->name('users.destroy');
    Route::post('/users/{user}/restore', [UserManagementController::class, 'restore'])->name('users.restore');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
