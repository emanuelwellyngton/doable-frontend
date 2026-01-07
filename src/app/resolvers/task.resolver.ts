import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Task, TaskService } from '../services/task.service';

export const taskResolver: ResolveFn<Task[]> = (route, state) => {
    const taskService = inject(TaskService);
    return taskService.getTasks();
};
