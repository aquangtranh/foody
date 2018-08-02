<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::paginate(config('paginate.number_users'));
        return view('admin.pages.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.pages.users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Http\Requests\CreateUserRequest $request request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        $userData = $request->all();
        User::create($userData);
        return redirect()->route('admin.users.index')->with('message', __('user.admin.create.create_success'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param App\Models\User $user user
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $data['user'] = $user;
        return view('admin.pages.users.edit', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request request
     * @param int                      $id      id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $updatedUser = $request->except(["username", "email"]);
            User::updateOrCreate(['id' => $user->id], $updatedUser);
            return redirect()->route('admin.users.index')->with('message', __('user.admin.edit.update_success'));
        } catch (Exception $e) {
            return redirect()->route('admin.users.index')->with('alert', __('user.admin.edit.update_fail'));
        }
    }
}
