import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';

import { Todo } from '@models/index';
import { Observable, of } from 'rxjs';
import { exhaustMap, tap } from 'rxjs/operators';

@Injectable()
export class TodoService {
  private static readonly baseUrl = `${environment.baseUrl}/todos`;
  private static todos: Todo[] = [];
  private static forceRefresh = true;

  constructor(private http: HttpClient) {}

  forceRefresh(shouldRefresh = true) {
    TodoService.forceRefresh = shouldRefresh;
  }

  addTodo(todoLike: Partial<Todo>): Observable<Todo[]> {
    const todoToAdd = new Todo({
      description: todoLike.description,
      dueDate: todoLike.dueDate,
      priorityId: todoLike.priority ? todoLike.priority.id : todoLike.priorityId
    });

    return this.http.post<Todo[]>(TodoService.baseUrl, [todoToAdd]).pipe(
      exhaustMap(() => {
        this.forceRefresh();
        return this.getTodos();
      })
    );
  }

  getTodos(): Observable<Todo[]> {
    if (!TodoService.forceRefresh) {
      return of([...TodoService.todos]);
    }

    return this.http.get<Todo[]>(TodoService.baseUrl).pipe(
      tap(todos => {
        this.forceRefresh(false);
        TodoService.todos = todos;
      })
    );
  }

  removeTodo(todoId: number): Observable<Todo[]> {
    return this.http.delete<string>(`${TodoService.baseUrl}/${todoId}`).pipe(
      exhaustMap(() => {
        this.forceRefresh();
        return this.getTodos();
      })
    );
  }

  updateTodos(todosToUpdate: Todo[]): Observable<Todo[]> {
    return this.http.put<Todo[]>(TodoService.baseUrl, todosToUpdate).pipe(
      exhaustMap(() => {
        this.forceRefresh();
        return this.getTodos();
      })
    );
  }
}
