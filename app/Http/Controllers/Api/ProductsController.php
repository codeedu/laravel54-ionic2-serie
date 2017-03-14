<?php

namespace App\Http\Controllers\Api;

use App\Product;
use App\Http\Controllers\Controller;

class ProductsController extends Controller
{
    public function index(){
        return Product::all();
    }
}
