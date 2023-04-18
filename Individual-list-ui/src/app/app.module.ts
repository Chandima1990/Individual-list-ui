import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { BaseModule } from './base/base.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatSnackBarModule,

    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,

    BaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
