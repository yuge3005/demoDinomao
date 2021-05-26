import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainDivComponent } from '../siene/main-div/main-div.component';
import { LobbyComponent } from '../siene/lobby/lobby.component';
import { LoadingAndPoComponent } from '../siene/loading-and-po/loading-and-po.component';
import { DynamicLayerComponent } from '../siene/dynamic-layer/dynamic-layer.component';
import { PageDirective } from '../siene/dynamic-layer/page.directive';
import { HeadBarComponent } from '../pagePart/head-bar/head-bar.component'
import { VideoComponent } from '../siene/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    MainDivComponent,
    LoadingAndPoComponent,
    DynamicLayerComponent,
    PageDirective,
    LobbyComponent,
    VideoComponent,
    HeadBarComponent
   ],
  imports: [
    BrowserModule
  ],
  entryComponents: [ LobbyComponent, VideoComponent, HeadBarComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
