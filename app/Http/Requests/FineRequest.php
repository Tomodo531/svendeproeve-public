<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class FineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => ['required', 'numeric', 'integer'],
            'fines' => ['array'],
            'fines.*.id' => ['nullable','numeric', 'integer'],
            'fines.*.title' => ['required', 'string'],
            'fines.*.description' => ['string'],
            'fines.*.amount' => ['required', 'numeric'],
        ];
    }
}
