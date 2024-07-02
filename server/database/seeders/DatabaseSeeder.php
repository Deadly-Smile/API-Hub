<?php

namespace Database\Seeders;

use App\Models\Tag;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->createRoles();
        $this->createUsers();
        $this->createTags();
    }

    private function createTags(): void
    {
        $tags = [
            ['name' => 'Image Classification', 'slug' => 'image_classification'],
            ['name' => 'Image Clustering', 'slug' => 'image_clustering'],
            ['name' => 'Object Detection', 'slug' => 'object_detection'],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }

    private function createUsers(): void
    {
        User::factory()->create([
            'name' => 'User-0',
            'email' => 'test@example0.com',
            'password' => '1234567890',
            'email_verified_at' => now(),
            'role_id' => Role::where('slug', 'master')->first()->id
        ]);
        User::factory()->create([
            'name' => 'User-1',
            'email' => 'test@example1.com',
            'password' => '1234567890',
            'email_verified_at' => now(),
            'role_id' => Role::where('slug', 'admin')->first()->id
        ]);
        User::factory()->create([
            'name' => 'User-2',
            'email' => 'test@example2.com',
            'password' => '1234567890',
            'email_verified_at' => now(),
            'role_id' => Role::where('slug', 'subscriber')->first()->id
        ]);
    }

    private function createRoles(): void
    {
        $roles = [
            ['name' => 'subscriber', 'slug' => 'subscriber'],
            ['name' => 'admin', 'slug' => 'admin'],
            ['name' => 'master', 'slug' => 'master'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
