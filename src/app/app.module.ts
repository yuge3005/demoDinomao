/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-26 13:31:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-10 16:33:08
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainDivComponent } from '../siene/main-div/main-div.component';
import { LobbyComponent } from '../siene/lobby/lobby/lobby.component';
import { LoadingAndPoComponent } from '../siene/loading-and-po/loading-and-po.component';
import { DynamicLayerComponent } from '../siene/dynamic-layer/dynamic-layer.component';
import { PageDirective } from '../siene/dynamic-layer/page.directive';
import { HeadBarComponent } from '../pagePart/head-bar/head-bar.component'
import { VideoComponent } from '../siene/video/video/video.component';
import { ImageComponent } from '../basicUI/image/image.component';
import { TextFieldComponent } from '../basicUI/text-field/text-field.component';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from '../siene/lobby/banner/banner.component';
import { BottomBarComponent } from '../pagePart/bottom-bar/bottom-bar.component';
import { ProductListComponent } from '../siene/lobby/product-list/product-list.component';
import { ProductItemComponent } from '../siene/lobby/product-item/product-item.component';
import { ControlBarComponent } from '../siene/video/control-bar/control-bar.component';

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
    ProductListComponent,
    ProductItemComponent,
    ControlBarComponent
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
