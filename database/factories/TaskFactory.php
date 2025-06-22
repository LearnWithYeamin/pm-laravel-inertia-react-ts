<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => $this->faker->unique()->sentence(3),
            'description' => $this->faker->paragraph(),
            'image_path' => $this->faker->imageUrl(640, 480, 'tasks', true, 'Task Image'),
            'status' => $this->faker->randomElement(['pending', 'in_progress', 'completed']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'assigned_user_id' => User::factory()->create()->id,
            'created_by' => 1,
            'updated_by' => 1,
            'project_id' => 1,
        ];
    }
}
