<?php

namespace App\Forms;

use Kris\LaravelFormBuilder\Form;

class ProductForm extends Form
{
    public function buildForm()
    {
        $this
            ->add('name', 'text')
            ->add('description', 'textarea')
            ->add('value', 'text');
    }
}
