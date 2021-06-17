# Step 3 - Services and Http Requests

## Objective

Setup two services `PriorityService` and `TodoService` and write test cases for them. Then fetch data and wire up basic UI functionality that verifies everything is working.

## Steps

### Create the files

1. Create a `common` folder under `src/app`.
2. Create a `service` folder under `src/app/common`.
3. Create a `priority` folder under `src/app/common/service`.
4. Create `index.ts` under `src/app/common/service`.
5. Create `priority.service.ts` under `src/app/common/service/priority`.
6. Create `priority.service.spec.ts` under `src/app/common/service/priority`.
7. Create `index.ts` under `src/app/common/service/priority`.
8. Create a `todo` folder under `src/app/common/service`.
9. Create `todo.service.ts` under `src/app/common/service/todo`.
10. Create `todo.service.spec.ts` under `src/app/common/service/todo`.
11. Create `index.ts` under `src/app/common/service/todo`.
12. Create `app-common.module.ts` under `src/app/common`.

<br><hr><br>

## Implementation Steps

### PriorityService

1. Create empty class with the `@Injectable()` decorator.

    <details>
      <summary>Snippet (Click to expand)</summary>

      ```TypeScript
      import { Injectable } from '@angular/core';

      @Injectable()
      export class PriorityService {}

      ```
    
    </details>
    <br>

2. Add method for getting priorities from `http://localhost:1337/priorities`.

    <details>
      <summary>Snippet (Click to expand)</summary>

      ```TypeScript
      import { HttpClient } from '@angular/common/http';
      import { Injectable } from '@angular/core';
      import { environment } from '@environment';

      import { Priority } from '@models/priority';
      import { Observable, of } from 'rxjs';
      import { tap } from 'rxjs/operators';

      @Injectable()
      export class PriorityService {
          private static readonly baseUrl = `${environment.baseUrl}/priorities`;
          private static priorities: Priority[];

          constructor(private http: HttpClient) {}

          getPriorities(): Observable<Priority[]> {
              return this.http.get<Priority[]>(PriorityService.baseUrl).pipe(
                  tap((priorities) => {
                      PriorityService.priorities = priorities;
                  })
              );
          }
      }

      ```

    </details>
    <br>

3. Add caching mechanism and method used to force data to be refreshed.

    <details>
      <summary>Snippet (Click to expand)</summary>

      ```TypeScript
      import { HttpClient } from '@angular/common/http';
      import { Injectable } from '@angular/core';
      import { environment } from '@environment';

      import { Priority } from '@models/priority';
      import { Observable, of } from 'rxjs';
      import { tap } from 'rxjs/operators';

      @Injectable()
      export class PriorityService {
          private static readonly baseUrl = `${environment.baseUrl}/priorities`;
          private static priorities: Priority[];
          private static forceRefresh = true;

          constructor(private http: HttpClient) {}

          forceRefresh() {
              PriorityService.forceRefresh = true;
          }

          getPriorities(): Observable<Priority[]> {
              if (!PriorityService.forceRefresh) {
                  return of([...PriorityService.priorities]);
              }

              return this.http.get<Priority[]>(PriorityService.baseUrl).pipe(
                  tap((priorities) => {
                      PriorityService.forceRefresh = false;
                      PriorityService.priorities = priorities;
                  })
              );
          }
      }

      ```

    </details>
    <br>

4. Add export to `src/app/common/service/priority/index.ts`.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      export { PriorityService } from './priority.service';

      ```

    </details>
    <br>

5. Add export to `src/app/common/service/index.ts`.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      export { PriorityService } from './priority';

      ```
    
    </details>
    <br>

6. Add test cases to cover our logic.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
      import { TestBed } from '@angular/core/testing';

      import { Priority } from '@models/priority';
      import { PriorityService } from './priority.service';

      describe('PriorityService', () => {
        let priorityService: PriorityService;
        let httpTestingController: HttpTestingController;

        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [
              HttpClientTestingModule
            ],
            providers: [
              PriorityService
            ]
          });

          priorityService = TestBed.inject(PriorityService);
          httpTestingController = TestBed.inject(HttpTestingController);
        });

        afterEach(() => httpTestingController.verify());

        describe('getPriorities', () => {
          it('calls expected endpoint if not cached', () => {
            const expectedUrl = 'http://localhost:1337/priorities';
            const expectedResult = [
              new Priority({id: 123, text: 'High', value: 1})
            ];

            priorityService.forceRefresh();
            priorityService.getPriorities().subscribe({
              next: result => {
                expect(result).toEqual(expectedResult);
              }
            });

            const req = httpTestingController.expectOne(expectedUrl);
            req.flush(expectedResult);

            expect(req.request.method).toBe('GET');
            expect(req.request.url).toBe(expectedUrl);
          });

          it('returns cached response if already fetched', () => {
            const expectedUrl = 'http://localhost:1337/priorities';
            const expectedResult = [
              new Priority({id: 123, text: 'High', value: 1})
            ];

            priorityService.forceRefresh();
            priorityService.getPriorities().subscribe({
              next: result => {
                expect(result).toEqual(expectedResult);
              }
            });

            const req = httpTestingController.expectOne(expectedUrl);
            req.flush(expectedResult);

            expect(req.request.method).toBe('GET');
            expect(req.request.url).toBe(expectedUrl);

            priorityService.getPriorities().subscribe({
              next: result => {
                expect(result).toEqual(expectedResult);
              }
            });

            httpTestingController.expectNone(expectedUrl);
          });
        });
      });

      ```

    </details>
    <br>

<hr>

### TodoService

1. Create empty class with the `@Injectable()` decorator.

    <details>
      <summary>Snippet (Click to expand)</summary>

      ```TypeScript
      import { Injectable } from '@angular/core';

      @Injectable()
      export class TodoService {}

      ```

    </details>
    <br>

2. Add CRUD operations to interact with `http://localhost:1337/todos` and `http://localhost:1337/todos/:todoId`.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
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

        constructor(private http: HttpClient) {}

        addTodo(todoLike: Partial<Todo>): Observable<Todo[]> {
          const todoToAdd = new Todo({
            description: todoLike.description,
            dueDate: todoLike.dueDate,
            priorityId: todoLike.priority ? todoLike.priority.id : todoLike.priorityId
          });

          return this.http.post<Todo[]>(TodoService.baseUrl, [todoToAdd]).pipe(
            exhaustMap(() => {
              return this.getTodos();
            })
          );
        }

        getTodos(): Observable<Todo[]> {
          return this.http.get<Todo[]>(TodoService.baseUrl).pipe(
            tap(todos => {
              TodoService.todos = todos;
            })
          );
        }

        removeTodo(todoId: number): Observable<Todo[]> {
          return this.http.delete<number>(`${TodoService.baseUrl}/${todoId}`).pipe(
            exhaustMap(() => {
              return this.getTodos();
            })
          );
        }

        updateTodos(todosToUpdate: Todo[]): Observable<Todo[]> {
          return this.http.put<Todo[]>(TodoService.baseUrl, todosToUpdate).pipe(
            exhaustMap(() => {
              return this.getTodos();
            })
          );
        }
      }

      ```

    </details>
    <br>

3. Add caching mechanism and method used to force data to be refreshed.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
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

        forceRefresh() {
          TodoService.forceRefresh = true;
        }

        addTodo(todoLike: Partial<Todo>): Observable<Todo[]> {
          const todoToAdd = new Todo({
            description: todoLike.description,
            dueDate: todoLike.dueDate,
            priorityId: todoLike.priority ? todoLike.priority.id : todoLike.priorityId
          });

          return this.http.post<Todo[]>(TodoService.baseUrl, [todoToAdd]).pipe(
            exhaustMap(() => {
              TodoService.forceRefresh = true;
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
              TodoService.todos = todos;
              TodoService.forceRefresh = false;
            })
          );
        }

        removeTodo(todoId: number): Observable<Todo[]> {
          return this.http.delete<number>(`${TodoService.baseUrl}/${todoId}`).pipe(
            exhaustMap(() => {
              TodoService.forceRefresh = true;
              return this.getTodos();
            })
          );
        }

        updateTodos(todosToUpdate: Todo[]): Observable<Todo[]> {
          return this.http.put<Todo[]>(TodoService.baseUrl, todosToUpdate).pipe(
            exhaustMap(() => {
              TodoService.forceRefresh = true;
              return this.getTodos();
            })
          );
        }
      }

      ```

    </details>
    <br>

4. Add export to `src/app/common/service/todo/index.ts`.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      export { TodoService } from './todo-service';

      ```

    </details>
    <br>

5. Add export to `src/app/common/service/index.ts`.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      export { PriorityService } from './priority';
      export { TodoService } from './todo';

      ```
    
    </details>
    <br>

6. Add test cases to cover our logic.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
      import { fakeAsync, TestBed, tick } from '@angular/core/testing';
      import { Todo } from '@models/todo';
      import { TodoService } from './todo-service';

      describe('TodoService', () => {
        const todoBaseUrl = 'http://localhost:1337/todos';

        let todoService: TodoService;
        let httpTestingController: HttpTestingController;

        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [
              HttpClientTestingModule
            ],
            providers: [
              TodoService
            ]
          });

          todoService = TestBed.inject(TodoService);
          httpTestingController = TestBed.inject(HttpTestingController);
        });

        afterEach(() => httpTestingController.verify());

        describe('addTodo', () => {
          it('calls the correct endpoint with expected values', () => {
            const expectedResult: Partial<Todo> = {
              id: 123,
              description: 'Fake description',
              dueDate: new Date(),
              priorityId: 0
            };

            todoService.addTodo(expectedResult).subscribe({
              next: result => {
                expect(result).toEqual([new Todo(expectedResult)])
              }
            });

            const postCall = httpTestingController.expectOne(todoBaseUrl);
            postCall.flush([]);

            const getCall = httpTestingController.expectOne(todoBaseUrl);
            getCall.flush([new Todo(expectedResult)]);

            expect(postCall.request.method).toBe('POST');
            expect(postCall.request.url).toBe(todoBaseUrl);

            expect(getCall.request.method).toBe('GET');
            expect(getCall.request.url).toBe(todoBaseUrl);
          });
        });

        describe('getTodos', () => {
          it('calls expected endpoint and returns todos', () => {
            const expectedResult = [
              new Todo({
                priorityId: 0, 
                description: 'fake todo',
                dueDate: new Date(),
                id: 0
              })
            ];

            todoService.forceRefresh();
            todoService.getTodos().subscribe({
              next: result => {
                expect(result).toEqual(expectedResult);
              }
            });

            const req = httpTestingController.expectOne(todoBaseUrl);
            req.flush(expectedResult);

            expect(req.request.method).toBe('GET');
            expect(req.request.url).toBe(todoBaseUrl);
          });

          it('returns cache if getTodos called more than once', () => {
            const expectedResult = [
              new Todo({
                priorityId: 0, 
                description: 'fake todo',
                dueDate: new Date(),
                id: 0
              })
            ];

            todoService.forceRefresh();
            todoService.getTodos().subscribe({
              next: result => {
                expect(result).toEqual(expectedResult);
              }
            });

            const req = httpTestingController.expectOne(todoBaseUrl);
            req.flush(expectedResult);

            todoService.getTodos().subscribe({
              next: result => {
                expect(result).toEqual(expectedResult);
              }
            });
            
            httpTestingController.expectNone(todoBaseUrl);

            expect(req.request.method).toBe('GET');
            expect(req.request.url).toBe(todoBaseUrl);
          });
        });

        describe('remoteTodo', () => {
          it('calls expected endpoint', () => {
            const expectedTodoId = 3;
            const expectedResult = [
              new Todo({
                priorityId: 0, 
                description: 'fake todo',
                dueDate: new Date(),
                id: 0
              })
            ];

            todoService.removeTodo(expectedTodoId).subscribe({
              next: result => {
                expect(result).toEqual(expectedResult);
              }
            });

            const deleteCall = httpTestingController.expectOne(`${todoBaseUrl}/${expectedTodoId}`, 'Expected DELETE call');
            deleteCall.flush(expectedTodoId);

            const getCall = httpTestingController.expectOne(todoBaseUrl);
            getCall.flush(expectedResult);

            expect(deleteCall.request.method).toBe('DELETE');
            expect(deleteCall.request.url).toBe(`${todoBaseUrl}/${expectedTodoId}`);

            expect(getCall.request.method).toBe('GET');
            expect(getCall.request.url).toBe(todoBaseUrl);
          });
        });

        describe('updateTodos', () => {
          it('calls correct endpoint and returns expected results', () => {
            const expectedResult = [
              new Todo({
                priorityId: 0, 
                description: 'fake todo',
                dueDate: new Date(),
                id: 0
              })
            ];

            todoService.updateTodos(expectedResult).subscribe({
              next: result => {
                expect(result).toEqual(expectedResult);
              }
            });

            const putCall = httpTestingController.expectOne(todoBaseUrl);
            putCall.flush([]);

            const getCall = httpTestingController.expectOne(todoBaseUrl);
            getCall.flush(expectedResult);

            expect(putCall.request.method).toBe('PUT');
            expect(putCall.request.url).toBe(todoBaseUrl);
            
            expect(getCall.request.method).toBe('GET');
            expect(getCall.request.url).toBe(todoBaseUrl);
          });
        });
      });

      ```
    
    </details>

<br><hr><br>

### AppCommonModule

1. Add the `PriorityService` and `TodoService` as providers.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      import { NgModule } from '@angular/core';

      import { PriorityService, TodoService } from './service';

      @NgModule({
          providers: [
              PriorityService,
              TodoService
          ]
      })
      export class AppCommonModule {}

      ```
    
    </details>

<br><hr><br>

### Make PriorityService and TodoService available to other components.

1. Add `AppCommonModule` to the `imports` of our `AppModule`.

    <details>
      <summary>Snippet (Click to expand)</summary>

      ```TypeScript
      import { HttpClientModule } from '@angular/common/http';
      import { NgModule } from '@angular/core';
      import { MatIconModule } from '@angular/material/icon';
      import { MatListModule } from '@angular/material/list';
      import { MatSidenavModule } from '@angular/material/sidenav';
      import { MatToolbarModule } from '@angular/material/toolbar';
      import { BrowserModule } from '@angular/platform-browser';
      import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

      import { AppCommonModule } from '@common/app-common.module';
      import { AppRoutingModule } from './app-routing.module';
      import { AppComponent } from './app.component';

      @NgModule({
        declarations: [
          AppComponent
        ],
        imports: [
          AppRoutingModule,
          AppCommonModule,
          BrowserModule,
          BrowserAnimationsModule,
          HttpClientModule,
          MatIconModule,
          MatListModule,
          MatSidenavModule,
          MatToolbarModule
        ],
        bootstrap: [AppComponent]
      })
      export class AppModule { }

      ```

    </details>

<br><hr><br>

### Update HomeComponent to use the TodoService

1. Add logic to get our todos during the `ngOnInit` lifecycle of the HomeComponent.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
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

      ```
    
    </details>
    <br>

2. Update `home.component.html` to display the todos that we've fetched.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```HTML
      <h1>{{title}}</h1>

      <div *ngFor="let todo of todos">
        <div>
          {{todo.id}}&nbsp;{{todo.description}}&nbsp;{{todo.dueDate}}
        </div>
      </div>

      ```
    
    </details>
    <br>

3. Update `home.component.spec.ts` to add test cases for the new logic.

    <details>
      <summary>Snippet (Click to expand)</summary>
    
      ```TypeScript
      import { HttpClientTestingModule } from '@angular/common/http/testing';
      import { ComponentFixture, TestBed } from '@angular/core/testing';
      import { RouterTestingModule } from '@angular/router/testing';
      import { TodoService } from '@common/service';
      import { Todo } from '@models/todo';
      import { of } from 'rxjs';

      import { HomeComponent } from './home.component';
      import { HomeModule } from './home.module';

      describe('HomeComponent', () => {
        let component: HomeComponent;
        let fixture: ComponentFixture<HomeComponent>;
        let todoService: TodoService;

        beforeEach(() => {
          TestBed.configureTestingModule({
            imports: [
              HomeModule,
              HttpClientTestingModule,
              RouterTestingModule
            ],
            providers: [
              TodoService
            ]
          }).compileComponents();

          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          todoService = TestBed.inject(TodoService);
        });

        it(`should have title 'Home Component Works!'`, () => {
          expect(component.title).toBe('Home Component Works!');
        });

        it('calls todoService.getTodos() on ngOnInit', () => {
          const expectedResult = [new Todo({
            description: 'fake todo',
            dueDate: new Date(),
            priorityId: 0
          })];
          const getTodosSpy = spyOn(todoService, 'getTodos').and.returnValue(of(expectedResult));

          component.ngOnInit();

          expect(getTodosSpy).toHaveBeenCalled();
          expect(component.todos).toEqual(expectedResult);
        });
      });

      ```
    
    </details>
    <br>