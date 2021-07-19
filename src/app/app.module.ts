/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-26 13:31:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-19 10:11:40
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LobbyComponent } from '../siene/lobby/lobby/lobby.component';
import { LoadingAndPoComponent } from '../siene/loading-and-po/loading-layer/loading-and-po.component';
import { DynamicLayerComponent } from '../siene/dynamic-layer/dynamic-layer.component';
import { PageDirective } from '../siene/dynamic-layer/page.directive';
import { HeadBarComponent } from '../pagePart/head-bar/head-bar.component'
import { VideoComponent } from '../siene/video/video/video.component';
import { ImageComponent } from '../basicUI/image/image.component';
import { ImageButtonComponent } from '../basicUI/image-button/image-button.component';
import { ImageScaleButtonComponent } from '../basicUI/image-scale-button/image-scale-button.component';
import { TextFieldComponent } from '../basicUI/text-field/text-field.component';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from '../siene/lobby/banner/banner.component';
import { BottomBarComponent } from '../pagePart/bottom-bar/bottom-bar.component';
import { ProductListComponent } from '../siene/lobby/product-list/product-list.component';
import { ProductItemComponent } from '../siene/lobby/product-item/product-item.component';
import { ControlBarComponent } from '../siene/video/control-bar/control-bar.component';
import { PopupLayerComponent } from './../siene/loading-and-po/popup-layer/popup-layer.component';
import { PopupDirective } from './../siene/loading-and-po/popup-layer/popup-directive.directive';
import { GenericModalComponent } from './../siene/loading-and-po/generic-modal/generic-modal.component';
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
    HeadBarComponent,
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    TextFieldComponent,
    BannerComponent,
    BottomBarComponent,
    ProductListComponent,
    ProductItemComponent,
    ControlBarComponent,
    PopupLayerComponent,
    PopupDirective,
    GenericModalComponent,
    GenericPoComponent,
    VipPassComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [ LobbyComponent, VideoComponent, GenericModalComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
