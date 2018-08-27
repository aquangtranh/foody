<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
    Route::post('login', 'Auth\LoginController@login');
    Route::get('logout', 'Auth\LoginController@logout')->name('logout');
});
Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin', 'middleware' => 'adminLogin'], function () {
    Route::get('/dashboard', 'HomeController@index')->name('dashboard');
    Route::resource('users', 'UserController');
    Route::get('categories/{category}/show-child', 'CategoryController@showChild')->name('categories.showChild');
    Route::resource('categories', 'CategoryController');
    Route::resource('stores', 'StoreController');
    Route::resource('products', 'ProductController');
    Route::resource('orders', 'OrderController');
});

Route::group(['namespace' => 'Home'], function () {
    Route::get('/', 'HomeController@index')->name('user.home');
    Route::get('/categories', 'CategoryController@index')->name('user.category');
    Route::get('/products', 'ProductController@index')->name('user.product');
    Route::get('/profile', 'UserController@index')->name('user.info');
});
