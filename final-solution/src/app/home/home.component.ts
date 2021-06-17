import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { PriorityService } from '@common/service';

import { TodoService } from '@common/service/todo/todo.service';
import { Todo } from '@models/todo';
import { combineLatest } from 'rxjs';

@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChildren('selectAll')
  selectAll: QueryList<MatCheckbox>;

  title = 'Todo List';
  displayedColumns = [ 'select', 'id', 'priority', 'dueDate', 'description' ];
  todos: Todo[] = [];
  selection = new SelectionModel<Todo>(true, []);

  constructor(private todoService: TodoService, private priorityService: PriorityService) {}

  ngAfterViewInit(): void {
      this.selectAll.first.focus();
  }

  ngOnInit(): void {
    combineLatest([
      this.priorityService.getPriorities(),
      this.todoService.getTodos()
    ])
    .subscribe({
      next: ([priorities, todos]) => {
        todos.forEach(todo => {
          todo.priority = priorities.find(priority => priority.id === todo.priorityId);
        });

        this.todos = todos;
      }
    })
  }

  isAllSelected(): boolean {
    const selectedRows = this.selection.selected.length;
    const totalRows = this.todos.length;

    return selectedRows === totalRows;
  }

  toggleAll(): void {
    this.isAllSelected() ? this.selection.clear() : this.todos.forEach(todo => this.selection.select(todo));
  }
}
