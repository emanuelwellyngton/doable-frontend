import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ChevronDown, ListFilter, LayoutGrid, List, Check, MoreVertical } from 'lucide-angular';
import { Task, TaskService, TaskStatus } from '../../services/task.service';
import { UiService } from '../../services/ui.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
    tasks: Task[] = [];
    filteredTasks: Task[] = [];

    searchControl = new FormControl('');
    currentDate = new Date();

    readonly Search = Search;
    readonly ChevronDown = ChevronDown;
    readonly ListFilter = ListFilter;
    readonly LayoutGrid = LayoutGrid;
    readonly List = List;
    readonly Check = Check;
    readonly MoreVertical = MoreVertical;

    constructor(
        private taskService: TaskService,
        private uiService: UiService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data) => {
            if (data['tasks']) {
                this.tasks = data['tasks'];
                this.filterTasks(this.searchControl.value || '');
            }
        });

        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(value => {
            this.filterTasks(value || '');
        });
    }

    // loadTasks removed as data is resolved via route

    filterTasks(searchTerm: string) {
        const lowerTerm = searchTerm.toLowerCase();
        this.filteredTasks = this.tasks.filter(task =>
            task.title.toLowerCase().includes(lowerTerm) ||
            task.description?.toLowerCase().includes(lowerTerm)
        );
        // Default sort by ID desc or createdAt if available
        this.filteredTasks.sort((a, b) => b.id - a.id);
    }

    openTask(task: Task) {
        this.uiService.openEditTaskModal(task);
    }

    toggleStatus(task: Task) {
        // Optimistic update
        const newStatus: TaskStatus = task.status === 'DONE' ? 'TO_DO' : 'DONE';
        const originalStatus = task.status;

        task.status = newStatus; // Update UI immediately

        const updatedTask = { ...task, status: newStatus };

        this.taskService.updateTask(task.id, updatedTask).subscribe({
            next: (res) => {
                // Optionally update with response to get fresh timestamps etc
                Object.assign(task, res);
            },
            error: () => {
                task.status = originalStatus; // Revert on error
            }
        });
    }
}
