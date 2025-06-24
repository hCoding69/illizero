<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Stancl\Tenancy\Contracts\TenantCouldNotBeIdentifiedException;
use Stancl\Tenancy\TenantManager;

class TenantAuthController extends Controller
{
 public function register(Request $request)
    {

        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('illizero-token')->plainTextToken;

        return response()->json([
            'message' => 'Utilisateur enregistré avec succès.',
            'token'   => $token,
            'name'    => $user->name,
                        "tenant_id" => tenant()->id,
                                    'redirect_to' => 'http://' . tenant()->id . '.localhost:5173/',


        ], 201);
    }


    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
            'company'  => 'nullable|string',  // company optionnelle si sous-domaine
        ]);

        if (!tenant()) {
            if (empty($data['company'])) {
                return response()->json(['error' => 'Company required if no subdomain'], 422);
            }

            try {
                tenancy()->initialize($data['company']);
            } catch (TenantCouldNotBeIdentifiedException $e) {
                return response()->json(['error' => 'Invalid company'], 422);
            }
        }

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }

        $token = $user->createToken('illizero-token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie.',
            'token'   => $token,
            'name'    => $user->name,
            'redirect_to' => 'http://' . tenant()->id . '.localhost:5173/',
            "tenant_id" => tenant()->id,

        ]);
    }


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie.',
        ]);
    }


    public function me(Request $request)
    {
        return response()->json($request->user()->only('name', 'email'));
    }
}
