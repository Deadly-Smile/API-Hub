<?php

namespace App\Http\Requests;

use App\Models\Role;
use App\Models\AIModel;
use Illuminate\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UploadPythonScriptRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $id = $this->route('id');
        $model = AIModel::findOrFail($id);
        $user = auth()->user();

        if ($model) {
            if ($user->id !== $model->user_id && !in_array(Role::findOrFail($user->role_id)->slug, ['admin', 'master'])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'script' => 'required|file|max:2048',
            'id' => 'required|exists:a_i_models,id',
            'parameters' => 'array',
            'parameters.*.id' => 'required|integer|exists:a_i_model_parameters,id',
            'parameters.*.is_file' => 'required|boolean',
            'parameters.*.value' => 'max:2048',
            // 'parameters.*.value' => 'required_if:parameters.*.is_file,false|string|nullable',
            // 'parameters.*.value' => 'required_if:parameters.*.is_file,true|file|nullable|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'script.required' => 'The script file is required.',
            'script.file' => 'The script must be a file.',
            'script.max' => 'The script file must not exceed 2MB.',
            'id.required' => 'The model ID is required.',
            'id.exists' => 'The specified model does not exist.',
            'parameters.array' => 'The parameters must be an array.',
            'parameters.*.id.required' => 'Each parameter must have an ID.',
            'parameters.*.id.integer' => 'Each parameter ID must be an integer.',
            'parameters.*.value.required' => 'Each parameter must have a value.',
            'parameters.*.is_file.required' => 'Each parameter must specify if it is a file.',
            'parameters.*.is_file.boolean' => 'The is_file attribute must be a boolean.',
        ];
    }

    protected function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {
            if ($this->hasFile('script')) {
                $file = $this->file('script');
                if ($file->getClientOriginalExtension() !== 'py') {
                    $validator->errors()->add('script', 'The script field must be a file of type: py.');
                }
            }
        });
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'error' => 'validation error',
            'errors' => $validator->errors(),
        ], 422));
    }
}
