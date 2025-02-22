<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;

class LetterStoreRequest extends FormRequest
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
            'letter_number_id' => 'required|exists:letter_numbers,id',
            'receiver' => 'required|exists:users,id',
            'date' => 'required|date',
            'subject' => 'required',
            'classification_code' => 'required',
            'attachment' => 'nullable|file',
            'dispositions' => ['nullable', 'array'],
            'dispositions.*' => ['nullable', 'exists:users,id'],
            'summary' => 'required',
            'description' => 'nullable'
        ];
    }

    public function attributes(): array
    {
        return [
            'letter_number_id' => 'Nomor Surat',
            'receiver' => 'Penerima',
            'date' => 'Tanggal',
            'subject' => 'Perihal',
            'classification_code' => 'Klasifikasi Surat',
            'attachment' => 'Lampiran',
            'dispositions' => 'Disposisi',
            'summary' => 'Ringkasan',
            'description' => 'Deskripsi Disposisi'
        ];
    }

    public function messages(): array
    {
        return [
            'letter_number_id.required' => 'Nomor Surat harus dipilih.',
            'letter_number_id.exists' => 'Nomor Surat tidak ditemukan.',
            'receiver.required' => 'Penerima Surat harus dipilih.',
            'receiver.exists' => 'Penerima Surat tidak ditemukan.',
            'date.required' => 'Tanggal harus dipilih.',
            'subject.required' => 'Perihal tidak boleh kosong.',
            'classification_code.required' => 'Kode klasifikasi harus dipilih.',
            'summary.required' => 'Ringkasan tidak boleh kosong.',
        ];
    }
}
