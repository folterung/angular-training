import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';

import { Priority, Todo } from '@models/index';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly baseUrl = `${environment.baseUrl}/todos`;
  private todos: Todo[];

  constructor(private http: HttpClient) {}

  addTodo(todoLike: Partial<Todo>): Observable<Todo[]> {
    const todoToAdd = new Todo({
      description: todoLike.description,
      dueDate: todoLike.dueDate,
      priorityId: todoLike.priorityId || todoLike.priority.id
    });

    return this.http.post<Todo[]>(this.baseUrl, [todoToAdd]).pipe(
      tap(todos => {
        this.todos.push(...todos);
      })
    );
  }

  getTodos(): Observable<Todo[]> {
    if (this.todos) {
      return of([...this.todos]);
    }

    return this.http.get<Todo[]>(this.baseUrl).pipe(
      tap(todos => this.todos = todos)
    );
  }

  getTodoById(todoId: number): Todo | undefined {
    return [...this.todos].find(todo => todo.id === todoId);
  }

  removeTodo(todoId: number): void {
    console.log(`Removing [Todo: ${todoId}].`);
    const matchingTodoIndex = this.todos.findIndex(todo => todo.id === todoId);

    if (matchingTodoIndex > -1) {
      this.todos.splice(matchingTodoIndex, 1);
    } else {
      console.log(`No todo to remove for id: ${todoId}`);
    }
  }

  updateTodo(todoToUpdate: Todo): void {
    let matchingTodo = this.todos.find(todo => todo.id === todoToUpdate.id);

    if (matchingTodo) {
      matchingTodo = todoToUpdate;
    } else {
      console.log(`No todo found to update for id: ${todoToUpdate.id}`);
    }
  }
}
