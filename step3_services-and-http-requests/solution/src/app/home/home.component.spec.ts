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
