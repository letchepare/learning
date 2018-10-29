import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest'

import { ListeNotesPage } from '../liste-notes/liste-notes'
import { EditNotePage } from '../edit-note/edit-note'

/**
 * Generated class for the DetailNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-note',
  templateUrl: 'detail-note.html',
})
export class DetailNotePage {

  note: any
  constructor(public navCtrl: NavController, public navParams: NavParams, private rest:RestProvider) {
    this.note = navParams.get('note');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailNotePage');
  }


  editNote(event,note){
    console.log("edit note")
    this.navCtrl.push(EditNotePage, { 'note': note });
  }

  supprimerNote(event,note){
    console.log("suppression note")
    this.rest.supprimerNote(note).subscribe(() => this.navCtrl.setRoot(ListeNotesPage));
  }
}
