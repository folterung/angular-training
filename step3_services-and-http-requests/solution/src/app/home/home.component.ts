import { Component } from '@angular/core';

import { TodoService } from '@common/service/todo';
import { Todo } from '@models/todo';

@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'Home Component Works!';
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe({
      next: todos => this.todos = todos
    });
  }
}
