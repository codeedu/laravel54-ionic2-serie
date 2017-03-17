<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PagSeguroController extends Controller
{
    public function getSessionId()
    {
        $credentials = \PagSeguroConfig::getAccountCredentials();
        return [
            'session_id' => \PagSeguroSessionService::getSession($credentials)
        ];
    }

    public function order(Request $request)
    {
        $items = $request->get('items');
        $hash = $request->get('hash');
        $total = $request->get('total');
        $token = $request->get('token');

        $directPaymentRequest = new \PagSeguroDirectPaymentRequest();
        $directPaymentRequest->setPaymentMode('DEFAULT');
        $directPaymentRequest->setPaymentMethod('CREDIT_CARD');
        $directPaymentRequest->setCurrency('BRL');

        foreach ($items as $key => $item) {
            $directPaymentRequest->addItem("00$key", $item['name'], 1, $item['value']);
        }

        $directPaymentRequest->setSender(
            'João Comprador',
            'joao@sandbox.pagseguro.com.br',
            '11',
            '56273440',
            'CPF',
            '156.009.442-76'
        );

        $directPaymentRequest->setSenderHash($hash);

        $installments = new \PagSeguroDirectPaymentInstallment([
            'quantity' => 1,
            'value' => $total
        ]);

        $sedexCode = \PagSeguroShippingType::getCodeByType('SEDEX');
        $directPaymentRequest->setShippingType($sedexCode);
        $directPaymentRequest->setShippingAddress(
            '01452002',
            'Av. Brig. Faria Lima',
            '1384',
            'apto. 114',
            'Jardim Paulistano',
            'São Paulo',
            'SP',
            'BRA'
        );

        $billingAddress = new \PagSeguroBilling(
            array(
                'postalCode' => '01452002',
                'street' => 'Av. Brig. Faria Lima',
                'number' => '1384',
                'complement' => 'apto. 114',
                'district' => 'Jardim Paulistano',
                'city' => 'São Paulo',
                'state' => 'SP',
                'country' => 'BRA'
            )
        );

        $creditCardData = new \PagSeguroCreditCardCheckout([
            'token' => $token,
            'installment' => $installments,
            'billing' => $billingAddress,
            'holder' => new \PagSeguroCreditCardHolder([
                'name' => 'João Comprador',
                'birthDate' => '01/10/1979',
                'areaCode' => '11',
                'number' => '23847623',
                'documents' => [
                    'type' => 'CPF',
                    'value' => '156.009.442-76'
                ]
            ])
        ]);

        $directPaymentRequest->setCreditCard($creditCardData);

        try {
            $credentials = \PagSeguroConfig::getAccountCredentials();

            $response = $directPaymentRequest->register($credentials);
            dd($response);
        } catch (\PagSeguroServiceException $e) {
            return [
                'message' => $e->getMessage(),
                'success' => false
            ];
        }
    }
}
