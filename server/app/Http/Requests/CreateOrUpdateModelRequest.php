<?php

namespace App\Http\Requests;

use App\Rules\FileOrTextRequired;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateOrUpdateModelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $parameters = $this->input('parameters', []);
        $rules = [
            'name' => 'required|string|max:255',
            'id' => 'integer|nullable',
            'parameters' => 'required|array',
            'parameters.*.id' => 'integer|nullable',
            'parameters.*.parameter_name' => 'required|string|max:255',
            'parameters.*.is_file' => 'required|boolean',
            'parameters.*.is_default' => 'boolean',
            'parameters.*.is_required' => 'boolean',
            'parameters.*.file' => [
                'nullable',
                new FileOrTextRequired($parameters),
            ],
            'parameters.*.text' => [
                'nullable',
                new FileOrTextRequired($parameters),
            ],
        ];

        return $rules;
    }

    protected function prepareForValidation()
    {
        $parameters = $this->input('parameters', []);

        foreach ($parameters as &$param) {
            $param['is_file'] = filter_var($param['is_file'], FILTER_VALIDATE_BOOLEAN);
            $param['is_default'] = filter_var($param['is_default'], FILTER_VALIDATE_BOOLEAN);
            $param['is_required'] = filter_var($param['is_required'], FILTER_VALIDATE_BOOLEAN);
        }

        $this->merge(['parameters' => $parameters]);
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'error' => 'validation error',
            'errors' => $validator->errors(),
        ], 422));
    }
}
