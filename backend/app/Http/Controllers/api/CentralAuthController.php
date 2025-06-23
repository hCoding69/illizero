<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class CentralAuthController extends Controller
{
public function registerCompany(Request $request)
    {
        $data = $request->validate([
            'company' => 'required|alpha_dash|unique:tenants,id',
        ]);

        // 1. créer le tenant
        $tenant = Tenant::create(['id' => $data['company']]);

        // 2. créer la base physique ↓

        // 3. associer le domaine
        $tenant->domains()->create([
            'domain' => "{$data['company']}.localhost",
        ]);

        // 4. lancer les migrations dans la nouvelle base
        Artisan::call('tenants:migrate', [
            '--tenants' => [$tenant->id],
            '--force'   => true,
        ]);

        return response()->json([
            'message'       => 'Entreprise enregistrée avec succès.',
'login_url' => "http://{$tenant->id}.localhost:5173/adduser",
            'register_url'  => "http://{$tenant->id}.localhost/api/register",
        ], 201);
    

    }
}
