import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular5-toaster';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { OnlineUserWindowComponent } from './online-user-window/online-user-window.component';
import { ConnectionService } from './connection.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    SideNavComponent,
    ChatWindowComponent,
    OnlineUserWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ToasterModule,
    AngularDraggableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([])
  ],
  providers: [
    ConnectionService,
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
