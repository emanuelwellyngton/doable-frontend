import { Component, OnInit, EffectRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, X, Trash2, Circle, CheckCircle, ChevronDown } from 'lucide-angular';
import { Task, TaskService } from '../../services/task.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskForm implements OnInit {
  form!: FormGroup;
  isStatusDropdownOpen = false;

  readonly X = X;
  readonly Trash2 = Trash2;
  readonly Circle = Circle;
  readonly CheckCircle = CheckCircle;
  readonly ChevronDown = ChevronDown;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public uiService: UiService
  ) {
    this.createForm();

    effect(() => {
      const task = this.uiService.editingTask();
      if (task) {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          status: task.status
        });
      } else {
        this.form.reset({ status: 'TO_DO' });
      }
    });
  }

  ngOnInit() { }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['TO_DO']
    });
  }


  get isEditing() {
    return !!this.uiService.editingTask();
  }

  toggleStatusDropdown(event: Event) {
    event.stopPropagation();
    this.isStatusDropdownOpen = !this.isStatusDropdownOpen;
  }

  setStatus(status: 'TO_DO' | 'IN_PROGRESS' | 'DONE') {
    this.form.patchValue({ status });
    this.isStatusDropdownOpen = false;
  }

  close() {
    this.isStatusDropdownOpen = false;
    this.uiService.closeTaskModal();
  }

  deleteTask() {
    const task = this.uiService.editingTask();
    if (task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.close();
        window.location.reload();
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const task = this.uiService.editingTask();

      if (task) {
        this.taskService.updateTask(task.id, formValue).subscribe(() => {
          this.close();
          window.location.reload();
        });
      } else {
        const newTask = { ...formValue, status: 'TO_DO' };
        this.taskService.createTask(newTask).subscribe(() => {
          this.close();
          window.location.reload();
        });
      }
    }
  }
}
