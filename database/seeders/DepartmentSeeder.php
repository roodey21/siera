<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            'GM',
            'OM',
            'HR',
            'Accountant',
            'Sales',
            'FO',
            'FBS',
            'FBP',
            'HK',
        ];

        foreach ($departments as $department) {
            Department::create([
                'name' => $department,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
