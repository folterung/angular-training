import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { AppCommonModule } from '@common/app-common.module';
import { AddTodoComponent } from './add-todo.component';

@NgModule({
  declarations: [
    AddTodoComponent
  ],
  imports: [
    AppCommonModule,
    A11yModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AddTodoComponent }
    ]),
  ],
})
export class AddTodoModule {}
