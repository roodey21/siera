<?php

namespace Database\Seeders;

use App\Models\LetterType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LetterTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $letterTypes = [
            ['name' => 'LPPHOTEL-GMINTERN', 'folder' => 'GM INTERN'],
            ['name' => 'LPPHOTEL-GMEKSTERN', 'folder' => 'GM EKSTERN'],
        ];

        foreach ($letterTypes as $type) {
            $existingType = LetterType::where('name', $type['name'])->exists();

            if ($existingType) {
                // If the record already exists, update the 'folder' column only
                LetterType::where('name', $type['name'])->update(['folder' => $type['folder']]);
            } else {
                // If the record does not exist, insert the new record
                LetterType::create($type);
            }
        }
    }
}
