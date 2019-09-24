import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {
    constructor(private http: HttpClient) { }

    getTodos() {
        return this.http.get(environment.api + '/todo')
            .pipe(map(res => res));
    }

    createTodo(todo) {
        return this.http.post(environment.api + '/todo', todo)
            .pipe(map(res => res));
    }

    deleteTodo(todo) {
        return this.http.delete(environment.api + '/todo/' + todo.id);
    }

}
