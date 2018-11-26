import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {OrganizationChartModule} from 'primeng/organizationchart';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OrganizationChartModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
