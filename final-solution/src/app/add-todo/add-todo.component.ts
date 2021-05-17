import {
  AfterViewInit,
  Component,
  ElementRef, NgZone,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Priority, Todo } from '@models/index';
import { PriorityService, TodoService } from '@common/service/index';

@Component({
  styleUrls: ['./add-todo.component.scss'],
  templateUrl: './add-todo.component.html'
})
export class AddTodoComponent implements AfterViewInit, OnInit {
  @ViewChildren('description')
  descriptionField: QueryList<ElementRef<HTMLInputElement>>;

  title = 'Add TODO';
  form: FormGroup;
  priorities: Priority[] = [];

  constructor(
      private formBuilder: FormBuilder,
      private ngZone: NgZone,
      private todoService: TodoService,
      private priorityService: PriorityService) {}

  ngAfterViewInit(): void {
    this.ngZone.run(() => {
      // Fixes view change detection error.
      setTimeout(() => {
        this.focusDescriptionField();
      }, 0);
    });
  }

  ngOnInit(): void {
    this.priorityService.getPriorities().subscribe({
      next: priorities => {
        this.priorities = priorities;
      }
    });
    
    this.form = this.formBuilder.group({
      description: new FormControl(null, Validators.required),
      dueDate: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required)
    });
  }

  save(): void {
    const todoLike = this.form.getRawValue();

    this.todoService.addTodo(new Todo(todoLike)).subscribe();
    this.form.reset();
    this.focusDescriptionField();
  }

  private focusDescriptionField(): void {
    this.descriptionField.first.nativeElement.focus();
  }
}
