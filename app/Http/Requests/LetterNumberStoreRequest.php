<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LetterNumberStoreRequest extends FormRequest
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
        return [
            'letter_type_id' => 'required|exists:letter_types,id',
            'pic' => 'required',
            'date' => 'required|date',
            'description' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'letter_type_id.required' => 'Tipe Surat harus diisi.',
            'letter_type_id.exists' => 'Tipe Surat tidak valid.',
            'pic.required' => 'Penanggung Jawab harus diisi.',
            'date.required' => 'Tanggal harus diisi.',
            'description.required' => 'Perihal harus diisi.',
        ];
    }

    public function attributes()
    {
        return [
            'letter_type_id' => 'Tipe Surat',
            'pic' => 'Penanggung Jawab',
            'date' => 'Tanggal',
            'description' => 'Perihal'
        ];
    }
}
