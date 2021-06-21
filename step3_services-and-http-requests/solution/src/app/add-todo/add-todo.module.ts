import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddTodoComponent } from './add-todo.component';

@NgModule({
  declarations: [
    AddTodoComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: AddTodoComponent }
    ])
  ]
})
export class AddTodoModule {}