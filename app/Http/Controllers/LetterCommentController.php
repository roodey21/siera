<?php

namespace App\Http\Controllers;

use App\Models\Letter;
use Illuminate\Http\Request;

class LetterCommentController extends Controller
{
    public function getComments(Letter $letter)
    {
        return $letter->comments()->with('users')->get();
    }
}
