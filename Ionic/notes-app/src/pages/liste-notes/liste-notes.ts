import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
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
  recherche: string = '';
  notes: any[];
  notesDefault: any[];
  pages: Array<{ title: string, component: any }>;
  rootPage: any = HomePage;


  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.getNotesParTitre();
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Notes', component: ListeNotesPage }
    ];
  }

  presentActionSheet(note) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Note N°' + note._id,
      buttons: [
        {
          text: 'Lire la note',
          icon: 'eye',
          handler: () => {
            this.lireNote(note);
          }
        }, {
          text: 'Éditer la note',
          icon: 'create',
          handler: () => {
            this.editerNote(note);
          }
        },
        {
          text: 'Supprimer la note',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.validerSuppression(note);
          }
        }, {
          text: 'Annuler',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });
    actionSheet.present();
  }

  validerSuppression(note) {
    const confirm = this.alertCtrl.create({
      title: 'Suppression de la note N°' + note._id,
      message: 'Êtes-vous certain de vouloir supprimer cette note?',
      buttons: [
        {
          text: 'Non',
        },
        {
          text: 'Oui',
          handler: () => {
            this.supprimerNote(note);
          }
        }
      ]
    });
    confirm.present();

  }

  private supprimerNote(note: any) {
    this.restProvider.supprimerNote(note).then(() => this.getNotesParTitre());
  }

  private editerNote(note) {
    this.navCtrl.push(EditNotePage, { 'note': note });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeNotesPage');
  }

  ionViewWillEnter() {
    this.getNotesParTitre()
  }


  getNotesParTitre() {
    this.restProvider.getNotesParTitre().then((res) => {
      this.notes = res.rows.map(row => {
        return row.value;
      })
      this.notesDefault = this.notes
    });
  }

  noteTapped(event, note) {
    this.presentActionSheet(note)
  }

  private lireNote(note) {
    this.navCtrl.push(DetailNotePage, { 'note': note });
  }

  creerNote(event, note) {
    console.log("creer note")
    this.navCtrl.push(EditNotePage, { 'note': note });
  }

  getItems(event) {
    this.notes = this.notesDefault;
    this.recherche = event.target.value;

    if (this.recherche && this.recherche.trim() != '') {
      this.notes = this.notes.filter((note) => {
        return (note.titre.toLowerCase().indexOf(this.recherche.toLowerCase()) > -1)
      })
    }
  }

}
