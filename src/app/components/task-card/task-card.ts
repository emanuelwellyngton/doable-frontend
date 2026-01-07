import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Trash2, Edit2, CheckCircle, Circle } from 'lucide-angular';
import { Task } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css']
})
export class TaskCard {
  @Input() task!: Task;
  @Output() statusChange = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  readonly Trash2 = Trash2;
  readonly Edit2 = Edit2;
  readonly CheckCircle = CheckCircle;
  readonly Circle = Circle;

  toggleStatus() {
    const newStatus = this.task.status === 'DONE' ? 'TO_DO' : 'DONE';
    this.statusChange.emit({ ...this.task, status: newStatus });
  }
}
