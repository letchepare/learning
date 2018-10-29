import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListeNotesPage } from './liste-notes';

@NgModule({
  declarations: [
    ListeNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListeNotesPage),
  ],
})
export class ListeNotesPageModule {}
