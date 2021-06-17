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
