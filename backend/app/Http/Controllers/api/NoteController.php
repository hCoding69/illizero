<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Auth;
class NoteController extends Controller
{
    public function index()
    {
        $notes = Auth::user()->notes()->latest()->get();

        return response()->json([
            'notes' => $notes
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        $note = Auth::user()->notes()->create($data);

        return response()->json([
            'message' => 'Note créée.',
            'note' => $note,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $note = Note::where('user_id', Auth::id())->findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
        ]);

        $note->update($data);

        return response()->json([
            'message' => 'Note mise à jour.',
            'note' => $note,
        ]);
    }

    public function destroy($id)
    {
        $note = Note::where('user_id', Auth::id())->findOrFail($id);
        $note->delete();

        return response()->json([
            'message' => 'Note supprimée.'
        ]);
    }
}
