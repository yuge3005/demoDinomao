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
import { ImageComponent } from './../pagePart/image/image.component';
import { TextFieldComponent } from './../pagePart/text-field/text-field.component';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './../siene/banner/banner.component';
import { BottomBarComponent } from '../pagePart/bottom-bar/bottom-bar.component';
import { ProductListComponent } from './../siene/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainDivComponent,
    LoadingAndPoComponent,
    DynamicLayerComponent,
    PageDirective,
    LobbyComponent,
    VideoComponent,
    HeadBarComponent,
    ImageComponent,
    TextFieldComponent,
    BannerComponent,
    BottomBarComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [ LobbyComponent, VideoComponent, HeadBarComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
