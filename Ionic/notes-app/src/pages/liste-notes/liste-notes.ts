import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { DetailNotePage } from '../detail-note/detail-note'

import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { EditNotePage } from '../edit-note/edit-note';

/**
 * Generated class for the ListeNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste-notes',
  templateUrl: 'liste-notes.html',
})
export class ListeNotesPage {

  notes: any;
  pages: Array<{title: string, component: any}>;
  rootPage: any = HomePage;


  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.getNotes();
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Notes', component: ListeNotesPage}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeNotesPage');
  }

  ionViewWillEnter(){
    this.getNotes()
  }

  getNotes(){
    this.restProvider.getNotes().subscribe((res) => this.notes = res);
  }

  noteTapped(event,note){
    this.navCtrl.push(DetailNotePage,{'note': note})
  }

  creerNote(event,note){
    console.log("creer note")
    this.navCtrl.push(EditNotePage, { 'note': note });
  }

}
