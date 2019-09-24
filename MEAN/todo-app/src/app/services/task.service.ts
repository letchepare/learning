import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class TaskService {

    constructor(private http: HttpClient) { }

    createTask(task) {
        return this.http.post(environment.api + '/todo/task', task)
            .pipe(map(res => res));
    }

    updateTask(task) {
        return this.http.put(environment.api + '/todo/task', task)
            .pipe(map(res => res));
    }

    deleteTask(task) {
        return this.http.delete(environment.api + '/todo/task/' + task.id);
    }

}