<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('User/Index', [
            'users' => User::select('id', 'name', 'email', 'role')->get()
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4',
            'role' => 'required|in:admin,anggota',
            'nim' => 'required_if:role,anggota|string|max:20',
            'fakultas' => 'required_if:role,anggota|string|max:100',
            'prodi' => 'required_if:role,anggota|string|max:100',
            'angkatan' => 'required_if:role,anggota|digits:4|integer',
        ]);

        $user = User::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role
        ]);

        if ($request->role === 'anggota') {
            Mahasiswa::create([
                'user_id' => $user->id,
                'nim' => $request->nim,
                'fakultas' => $request->fakultas,
                'prodi' => $request->prodi,
                'angkatan' => $request->angkatan,
            ]);
        }

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user): Response
    {
        $user->load('mahasiswa');
        return Inertia::render('User/Edit', ['user' => $user]);
    }
    

    public function update(Request $request, User $user)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
        'password' => 'nullable|min:4',
        'role' => 'required|in:admin,anggota',
        'nim' => 'required_if:role,anggota|string|max:20',
        'fakultas' => 'required_if:role,anggota|string|max:100',
        'prodi' => 'required_if:role,anggota|string|max:100',
        'angkatan' => 'required_if:role,anggota|digits:4|integer',
    ]);

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'role' => $request->role,
        'password' => $request->password ? Hash::make($request->password) : $user->password
    ]);

    if ($user->role === 'anggota') {
        $mahasiswa = $user->mahasiswa; // pastikan ada relasi di model User

        if ($mahasiswa) {
            $mahasiswa->update([
                'nim' => $request->nim,
                'fakultas' => $request->fakultas,
                'prodi' => $request->prodi,
                'angkatan' => $request->angkatan,
            ]);
        } else {
            Mahasiswa::create([
                'user_id' => $user->id,
                'nim' => $request->nim,
                'fakultas' => $request->fakultas,
                'prodi' => $request->prodi,
                'angkatan' => $request->angkatan,
            ]);
        }
    }

    return redirect()->route('users.index')->with('success', 'User updated successfully.');
}


    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
