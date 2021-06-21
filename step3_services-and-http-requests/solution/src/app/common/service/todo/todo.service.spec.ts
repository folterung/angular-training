import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from '@models/todo';
import { TodoService } from './todo.service';

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
