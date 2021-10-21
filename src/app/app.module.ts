/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-26 13:31:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-21 11:53:34
*/
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BasicUiModule } from '../basicUI/basic-ui.module';
import { DinomaoGameModule } from '../service/dinomao-game.module';

import { AppComponent } from './app.component';
import { LobbyComponent } from '../siene/lobby/lobby/lobby.component';
import { LoadingAndPoComponent } from '../siene/loading-and-po/loading-layer/loading-and-po.component';
import { DynamicLayerComponent } from '../siene/dynamic-layer/dynamic-layer.component';
import { FlyingCoinsComponent } from '../siene/flying-coins/flying-coins.component';
import { PageDirective } from '../siene/dynamic-layer/page.directive';
import { VideoComponent } from '../siene/video/video/video.component';
import { BannerComponent } from '../siene/lobby/banner/banner.component';
import { ProductListComponent } from '../siene/lobby/product-list/product-list.component';
import { ProductItemComponent } from '../siene/lobby/product-item/product-item.component';
import { ControlBarComponent } from '../siene/video/control-bar/control-bar.component';
import { PopupLayerComponent } from '../siene/loading-and-po/popup-layer/popup-layer.component';
import { PopupDirective } from '../siene/loading-and-po/popup-layer/popup-directive.directive';
import { GenericPopupComponent } from '../popups/generic-popup/generic-popup.component';
import { GenericPoComponent } from '../popups/generic-po/generic-po.component';
import { VipPassComponent } from '../popups/vip-pass/vip-pass.component';
import { WelcomeComponent } from '../popups/welcome/welcome.component';
import { DailyBonusComponent } from '../popups/daily-bonus/daily-bonus.component';
import { DailyItemComponent } from '../popups/daily-bonus/daily-item/daily-item.component';
import { ShopComponent } from '../siene/shop/shop/shop.component';
import { BankItemComponent } from '../siene/shop/bank-item/bank-item.component';
import { BankScrollListComponent } from '../siene/shop/bank-scroll-list/bank-scroll-list.component';
import { TicketItemComponent } from '../siene/shop/ticket-item/ticket-item.component';
import { TicketScrollListComponent } from '../siene/shop/ticket-scroll-list/ticket-scroll-list.component';
import { ProductScrollListComponent } from '../siene/lobby/product-scroll-list/product-scroll-list.component';
import { ForceUpdateComponent } from '../popups/force-update/force-update.component';
import { ProductInfoComponent } from '../popups/product-info/product-info.component';
import { UserCenterComponent } from '../siene/my/user-center/user-center.component';
import { UserCenterItemComponent } from '../siene/my/user-center-item/user-center-item.component';
import { UserCenterScrollListComponent } from '../siene/my/user-center-scroll-list/user-center-scroll-list.component';
import { AboutUsComponent } from '../siene/my/about-us/about-us.component';
import { SoundAndLogoutComponent } from '../siene/my/sound-and-logout/sound-and-logout.component';
import { LogoutComponent } from '../popups/Logout/Logout.component';
import { PurchaseSuccessComponent } from '../popups/purchase-success/purchase-success.component';
import { VipLevelListComponent } from '../siene/shop/vip-level-list/vip-level-list.component';
import { ContactUsComponent } from '../siene/my/contact-us/contact-us.component';
import { StartUpComponent } from '../siene/start-up/start-up.component';
import { ProdInfoButtonComponent } from '../siene/video/control-bar/prod-info-button/prod-info-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingAndPoComponent,
    DynamicLayerComponent,
    FlyingCoinsComponent,
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
    VipPassComponent,
    WelcomeComponent,
    DailyBonusComponent,
    DailyItemComponent,
    ShopComponent,
    BankItemComponent,
    BankScrollListComponent,
    TicketItemComponent,
    TicketScrollListComponent,
    ProductScrollListComponent,
    ForceUpdateComponent,
    ProductInfoComponent,
    UserCenterComponent,
    UserCenterItemComponent,
    UserCenterScrollListComponent,
    AboutUsComponent,
    SoundAndLogoutComponent,
    LogoutComponent,
    PurchaseSuccessComponent,
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
  entryComponents: [ LobbyComponent, VideoComponent, ShopComponent, UserCenterComponent, AboutUsComponent, SoundAndLogoutComponent, ContactUsComponent, StartUpComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
