import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskForm implements OnInit, OnChanges {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<{ title: string; description: string }>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    // Initial setup
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.form.patchValue({
        title: this.task.title,
        description: this.task.description
      });
    } else if (changes['task'] && !this.task) {
      if (this.form) this.form.reset();
    }
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
