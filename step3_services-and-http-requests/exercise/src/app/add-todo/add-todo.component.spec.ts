import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AddTodoComponent } from './add-todo.component';
import { AddTodoModule } from './add-todo.module';

describe('AddTodoComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AddTodoModule,
        RouterTestingModule
      ]
    }).compileComponents();
  });

  it(`should have title 'Add Todo Component Works!'`, () => {
    const fixture = TestBed.createComponent(AddTodoComponent);
    const component = fixture.componentInstance;
    expect(component.title).toBe('Add Todo Component Works!');
  });
});
