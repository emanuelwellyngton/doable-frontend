import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, ClipboardList } from 'lucide-angular';
import { TaskCard } from '../task-card/task-card';
import { TaskForm } from '../task-form/task-form';
import { TaskService, Task } from '../../services/task.service';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, LucideAngularModule, TaskCard, TaskForm],
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    showForm = false;
    editingTask: Task | null = null;

    readonly Plus = Plus;
    readonly ClipboardList = ClipboardList;

    constructor(private taskService: TaskService) { }

    get completedCount(): number {
        return this.tasks.filter(t => t.status === 'DONE').length;
    }

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        this.taskService.getTasks().subscribe({
            next: (tasks) => {
                // Sort tasks: TODO first, then by date desc (if available) or id desc
                this.tasks = tasks.sort((a, b) => {
                    if (a.status === b.status) {
                        return b.id - a.id;
                    }
                    return a.status === 'TODO' ? -1 : 1;
                });
            },
            error: (err) => console.error('Error loading tasks', err)
        });
    }

    openCreateForm() {
        this.editingTask = null;
        this.showForm = true;
    }

    openEditForm(task: Task) {
        this.editingTask = task;
        this.showForm = true;
    }

    closeForm() {
        this.showForm = false;
        this.editingTask = null;
    }

    handleSave(taskData: { title: string; description: string }) {
        if (this.editingTask) {
            this.taskService.updateTask(this.editingTask.id, taskData).subscribe({
                next: () => {
                    this.loadTasks();
                    this.closeForm();
                },
                error: (err) => console.error('Error updating task', err)
            });
        } else {
            const newTask = {
                ...taskData,
                status: 'TODO' as const
            };
            this.taskService.createTask(newTask).subscribe({
                next: () => {
                    this.loadTasks();
                    this.closeForm();
                },
                error: (err) => console.error('Error creating task', err)
            });
        }
    }

    handleDelete(task: Task) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskService.deleteTask(task.id).subscribe({
                next: () => this.loadTasks(),
                error: (err) => console.error('Error deleting task', err)
            });
        }
    }

    handleStatusChange(task: Task) {
        this.taskService.updateTask(task.id, { status: task.status }).subscribe({
            next: () => this.loadTasks(),
            error: (err) => console.error('Error updating status', err)
        });
    }
}
