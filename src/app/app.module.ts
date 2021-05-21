import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainDivComponent } from '../siene/main-div/main-div.component';
import { LobbyComponent } from 'src/siene/lobby/lobby.component';
import { LoadingAndPoComponent } from '../siene/loading-and-po/loading-and-po.component';
import { DynamicLayerComponent } from '../siene/dynamic-layer/dynamic-layer.component';
import { PageDirective } from '../siene/dynamic-layer/page.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainDivComponent,
    LobbyComponent,
    LoadingAndPoComponent,
    DynamicLayerComponent,
    PageDirective
   ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
