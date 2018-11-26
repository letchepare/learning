import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import PouchDB from 'pouchdb';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class RestProvider {
  apiUrl = 'http://192.168.2.148:3000';
  apiPouchDBNotes = 'http://192.168.2.148:5984/notes';
  db = new PouchDB('notes');
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');

    var queriesNotes = {
      "_id": "_design/allNotes",
      "views": {
        "allNotes": {
          "map": "function (doc) {\n  emit(doc._id, doc);\n}"
        },
        "allNotesParTitre": {
          "map": "function (doc) {\n  emit(doc.titre, doc);\n}"
        }
      },
      "language": "javascript"
    };

    this.db.get('_design/allNotes').catch(() => {
      this.db.put(queriesNotes).then(res => console.log(res)).catch(err => console.log(err));
    });

    var options = {
      live: true,
      retry: true,
      continuous: true
    };
    this.db.sync(this.apiPouchDBNotes, options).catch(err => console.log(err));
  }




  // creerNoteJsonServer(note): Observable<any> {
  //   return this.http.post(this.apiUrl + '/notes', note);
  // }

  creerNote(note): Observable<any> {
    return this.http.post(this.apiPouchDBNotes, note);
  }

  creerNoteSyncAuto(note) {
    this.db.post(note).then((res) => console.log(res)).catch(err => console.error(err))
  }


  // updateNoteJsonServer(note): Observable<any> {
  //   return this.http.put(this.apiUrl + '/notes/'+ note.id, note);
  // }

  // updateNoteSistant(note): Observable<any> {
  //   return this.http.put(this.apiPouchDBNotes, note);
  // }

  updateNote(note) {
    return this.db.put(note);
  }


  // getNotesJsonServer(): Observable<any> {
  //   return this.http.get(this.apiUrl + '/notes');
  // }

  // getNotes(): Observable<any> {
  //   return this.http.get(this.apiPouchDBNotes + "/_design/allNotes/_view/allNotes");
  // }

  // getNotesParTitreDistant(): Observable<any> {
  //   return this.http.get(this.apiPouchDBNotes + "/_design/allNotes/_view/allNotesParTitre");
  // }

  async getNotesParTitre() {
    return await this.db.query("allNotes/allNotesParTitre");
  }


  // supprimerNoteJsonServer(note): Observable<any> {
  //   return this.http.delete(this.apiUrl + '/notes/' + note.id);
  // }

  // supprimerNoteDistant(note): Observable<any> {
  //   return this.http.delete(this.apiPouchDBNotes + '/' + note._id + '?rev=' + note._rev);
  // }

  supprimerNote(note) {
    return this.db.remove(note);
  }

}
