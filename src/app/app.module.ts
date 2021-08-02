/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-26 13:31:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-02 16:30:28
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

import { BasicUiModule } from '../basicUI/basic-ui.module';
import { DinomaoGameModule } from 'src/service/dinomao-game.module';

import { AppComponent } from './app.component';
import { LobbyComponent } from '../siene/lobby/lobby/lobby.component';
import { LoadingAndPoComponent } from '../siene/loading-and-po/loading-layer/loading-and-po.component';
import { DynamicLayerComponent } from '../siene/dynamic-layer/dynamic-layer.component';
import { PageDirective } from '../siene/dynamic-layer/page.directive';
import { VideoComponent } from '../siene/video/video/video.component';
import { BannerComponent } from '../siene/lobby/banner/banner.component';
import { ProductListComponent } from '../siene/lobby/product-list/product-list.component';
import { ProductItemComponent } from '../siene/lobby/product-item/product-item.component';
import { ControlBarComponent } from '../siene/video/control-bar/control-bar.component';
import { PopupLayerComponent } from './../siene/loading-and-po/popup-layer/popup-layer.component';
import { PopupDirective } from './../siene/loading-and-po/popup-layer/popup-directive.directive';
import { GenericPopupComponent } from './../siene/loading-and-po/generic-popup/generic-popup.component';
import { GenericPoComponent } from './../siene/loading-and-po/generic-po/generic-po.component';
import { VipPassComponent } from './../popups/vip-pass/vip-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAndPoComponent,
    DynamicLayerComponent,
    PageDirective,
    LobbyComponent,
    VideoComponent,
    BannerComponent,
    ProductListComponent,
    ProductItemComponent,
    ControlBarComponent,
    PopupLayerComponent,
    PopupDirective,
    GenericPoComponent,
    GenericPopupComponent,
    VipPassComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BasicUiModule,
    DinomaoGameModule
  ],
  entryComponents: [ LobbyComponent, VideoComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
