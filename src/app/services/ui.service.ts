import { Injectable, signal } from '@angular/core';
import { Task } from './task.service';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    isTaskModalOpen = signal(false);
    editingTask = signal<Task | null>(null);

    openCreateTaskModal() {
        this.editingTask.set(null);
        this.isTaskModalOpen.set(true);
    }

    openEditTaskModal(task: Task) {
        this.editingTask.set(task);
        this.isTaskModalOpen.set(true);
    }

    closeTaskModal() {
        this.isTaskModalOpen.set(false);
        this.editingTask.set(null);
    }

    isSidebarOpen = signal(false);

    toggleSidebar() {
        this.isSidebarOpen.update(v => !v);
    }

    closeSidebar() {
        this.isSidebarOpen.set(false);
    }

    openSidebar() {
        this.isSidebarOpen.set(true);
    }
}
