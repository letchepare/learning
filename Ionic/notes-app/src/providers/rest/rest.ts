import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = 'http://192.168.2.148:3000';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }


  creerNote(note): Observable<any> {
    return this.http.post(this.apiUrl + '/notes', note);
  }

  updateNote(note): Observable<any> {
    return this.http.put(this.apiUrl + '/notes/'+ note.id, note);
  }


  getNotes(): Observable<any> {
    return this.http.get(this.apiUrl + '/notes');
  }

  supprimerNote(note): Observable<any> {
    return this.http.delete(this.apiUrl + '/notes/' + note.id);
  }

}
