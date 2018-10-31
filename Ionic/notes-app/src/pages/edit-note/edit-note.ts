import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'

import { ListeNotesPage } from '../liste-notes/liste-notes'

/**
 * Generated class for the EditNotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {
  note: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private rest:RestProvider) {
    this.note = navParams.get('note');

    if(this.note==undefined)
      this.note = {"id":'',"titre":'',"content":''};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNotePage');
  }

  ionViewWillLeave() {
    if(this.note.id==undefined || this.note.id=='')
      this.rest.creerNote(this.note).subscribe()
    else if(this.note.titre!='' || this.note.content!='')
      this.rest.updateNote(this.note).subscribe();
      
    this.navCtrl.setRoot(ListeNotesPage)
  }

}
