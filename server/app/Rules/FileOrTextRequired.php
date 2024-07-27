<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class FileOrTextRequired implements ValidationRule
{
    private $parameters;

    public function __construct($parameters)
    {
        $this->parameters = $parameters;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        preg_match('/parameters\.(\d+)\./', $attribute, $matches);
        $index = $matches[1] ?? null;

        if ($index !== null) {
            $isFile = $this->parameters[$index]['is_file'] ?? false;
            $isDefault = $this->parameters[$index]['is_default'] ?? false;

            if ($isDefault) {
                if ($isFile && empty($value)) {
                    $fail('The :attribute field is required when is_file is true and the parameter is default.');
                } elseif (!$isFile && empty($value)) {
                    $fail('The :attribute field is required when is_file is false and the parameter is default.');
                }
            }
        }
    }

    public function message()
    {
        return 'The :attribute field is required when the parameter is default and is_file is true/false.';
    }
}
