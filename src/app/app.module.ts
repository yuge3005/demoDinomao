/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-26 13:31:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-22 16:46:23
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BasicUiModule } from '../basicUI/basic-ui.module';
import { DinomaoGameModule } from '../service/dinomao-game.module';

import { AppComponent } from './app.component';
import { LoadingAndPoComponent } from '../siene/loading-and-po/loading-layer/loading-and-po.component';
import { DynamicLayerComponent } from '../siene/dynamic-layer/dynamic-layer.component';
import { FlyingCoinsComponent } from '../siene/flying-coins/flying-coins.component';
import { PageDirective } from '../siene/dynamic-layer/page.directive';
import { BannerComponent } from '../pages/lobby/banner/banner.component';
import { ProductListComponent } from '../pages/lobby/product-list/product-list.component';
import { ProductItemComponent } from '../pages/lobby/product-item/product-item.component';
import { ControlBarComponent } from '../pages/video/control-bar/control-bar.component';
import { PopupLayerComponent } from '../siene/loading-and-po/popup-layer/popup-layer.component';
import { PopupDirective } from '../siene/loading-and-po/popup-layer/popup-directive.directive';
import { BankItemComponent } from '../pages/shop/bank-item/bank-item.component';
import { BankScrollListComponent } from '../pages/shop/bank-scroll-list/bank-scroll-list.component';
import { TicketItemComponent } from '../pages/shop/ticket-item/ticket-item.component';
import { TicketScrollListComponent } from '../pages/shop/ticket-scroll-list/ticket-scroll-list.component';
import { ProductScrollListComponent } from '../pages/lobby/product-scroll-list/product-scroll-list.component';
import { UserCenterItemComponent } from '../pages/my/user-center-item/user-center-item.component';
import { UserCenterScrollListComponent } from '../pages/my/user-center-scroll-list/user-center-scroll-list.component';
import { VipLevelListComponent } from '../pages/shop/vip-level-list/vip-level-list.component';
import { ContactUsComponent } from '../pages/my/contact-us/contact-us.component';
import { StartUpComponent } from '../pages/start-up/start-up.component';
import { ProdInfoButtonComponent } from '../pages/video/control-bar/prod-info-button/prod-info-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAndPoComponent,
    DynamicLayerComponent,
    FlyingCoinsComponent,
    PageDirective,
    BannerComponent,
    ProductListComponent,
    ProductItemComponent,
    ControlBarComponent,
    PopupLayerComponent,
    PopupDirective,
    BankItemComponent,
    BankScrollListComponent,
    TicketItemComponent,
    TicketScrollListComponent,
    ProductScrollListComponent,
    UserCenterItemComponent,
    UserCenterScrollListComponent,
    VipLevelListComponent,
    ContactUsComponent,
    StartUpComponent,
    ProdInfoButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BasicUiModule,
    DinomaoGameModule
  ],
  entryComponents: [LoadingAndPoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
