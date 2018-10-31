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
  apiPouchDBNotes = 'http://192.168.2.148:5984/notes';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }


  // creerNoteJsonServer(note): Observable<any> {
  //   return this.http.post(this.apiUrl + '/notes', note);
  // }

  creerNote(note): Observable<any>{
    return this.http.post(this.apiPouchDBNotes, note);
  }


  // updateNoteJsonServer(note): Observable<any> {
  //   return this.http.put(this.apiUrl + '/notes/'+ note.id, note);
  // }

  updateNote(note): Observable<any> {
    return this.http.put(this.apiPouchDBNotes, note);
  }


  // getNotesJsonServer(): Observable<any> {
  //   return this.http.get(this.apiUrl + '/notes');
  // }

  getNotes(): Observable<any> {
    return this.http.get(this.apiPouchDBNotes + "/_design/allNotes/_view/allNotes");
  }

  getNotesParTitre(): Observable<any> {
    return this.http.get(this.apiPouchDBNotes + "/_design/allNotes/_view/allNotesParTitre");
  }

  
  // supprimerNoteJsonServer(note): Observable<any> {
  //   return this.http.delete(this.apiUrl + '/notes/' + note.id);
  // }

  supprimerNote(note): Observable<any> {
    return this.http.delete(this.apiPouchDBNotes + '/' + note._id + '?rev=' + note._rev);
  }

}
