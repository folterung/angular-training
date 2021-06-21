import { NgModule } from '@angular/core';

import { PriorityService, TodoService } from './service';

@NgModule({
    providers: [
        PriorityService,
        TodoService
    ]
})
export class AppCommonModule {}
