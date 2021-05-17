import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { AppCommonModule } from '@common/app-common.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    AppCommonModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent }
    ]),
    MatCheckboxModule,
    MatTableModule
  ]
})
export class HomeModule {}
