import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';

import { Priority } from '@models/priority';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PriorityService {
    private readonly baseUrl = `${environment.baseUrl}/priorities`;
    private priorities: Priority[];

    constructor(private http: HttpClient) {}

    getPriorities(): Observable<Priority[]> {
        if (this.priorities) {
            return of([...this.priorities]);
        }

        return this.http.get<Priority[]>(this.baseUrl).pipe(
            tap((priorities) => {
                this.priorities = priorities;
            })
        );
    }
}
