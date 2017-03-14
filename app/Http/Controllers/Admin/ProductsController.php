<?php

namespace App\Http\Controllers\Admin;

use App\Forms\ProductForm;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Kris\LaravelFormBuilder\FormBuilder;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::paginate(5);
        return view('admin.products.index',compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $form = \FormBuilder::create(ProductForm::class, [
            'method' => 'POST',
            'url' => route('admin.products.store')
        ]);
        $title = "Novo produto";
        return view('admin.products.save', compact('form','title'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormBuilder $formBuilder)
    {
        $form = $formBuilder->create(ProductForm::class);

        Product::create($form->getFieldValues());

        return redirect()->route('admin.products.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        $form = \FormBuilder::create(ProductForm::class, [
            'method' => 'PUT',
            'url' => route('admin.products.update', ['id' => $product->id]),
            'model' => $product
        ]);
        $title = "Editar produto";
        return view('admin.products.save', compact('form','title'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(FormBuilder $formBuilder, Product $product)
    {
        $form = $formBuilder->create(ProductForm::class);
        $product->fill($form->getFieldValues());
        $product->save();
        return redirect()->route('admin.products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index');
    }
}
