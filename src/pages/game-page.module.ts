/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-25 10:19:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 14:00:10
 */
import { UserCenterComponent } from './my/user-center/user-center.component';
export { UserCenterComponent } from './my/user-center/user-center.component';
import { SoundAndLogoutComponent } from './my/sound-and-logout/sound-and-logout.component';
export { SoundAndLogoutComponent } from './my/sound-and-logout/sound-and-logout.component';
import { ContactUsComponent } from './my/contact-us/contact-us.component';
export { ContactUsComponent } from './my/contact-us/contact-us.component';
import { AboutUsComponent } from './my/about-us/about-us.component';
export { AboutUsComponent } from './my/about-us/about-us.component';
import { VideoComponent } from './video/video/video.component';
export { VideoComponent } from './video/video/video.component';
import { StartUpComponent } from './before-lobby/start-up/start-up.component';
export { StartUpComponent } from './before-lobby/start-up/start-up.component';
import { ShopComponent } from './shop/shop/shop.component';
export { ShopComponent } from './shop/shop/shop.component';
import { LobbyComponent } from './lobby/lobby/lobby.component';
export { LobbyComponent } from './lobby/lobby/lobby.component';
import { VideoRecordComponent } from './my/video-record/video-record.component';
export { VideoRecordComponent } from './my/video-record/video-record.component';
import { RecordPlayBackComponent } from './my/video-play-back/record-play-back/record-play-back.component';
export { RecordPlayBackComponent } from './my/video-play-back/record-play-back/record-play-back.component';
import { LastWinPlayBackComponent } from './my/video-play-back/last-win-play-back/last-win-play-back.component';
export { LastWinPlayBackComponent } from './my/video-play-back/last-win-play-back/last-win-play-back.component';
import { LedgerComponent } from './my/ledger/ledger.component';
export { LedgerComponent } from './my/ledger/ledger.component';
import { AddressComponent } from './my/address/address.component';
export { AddressComponent } from './my/address/address.component';
import { LoginPageComponent } from './before-lobby/login-page/login-page.component';
export { LoginPageComponent } from './before-lobby/login-page/login-page.component';
import { EditAddressComponent } from './my/edit-address/edit-address.component';
export { EditAddressComponent } from './my/edit-address/edit-address.component';
import { OrderForGoodsComponent } from './order-for-goods/order-for-goods.component';
export { OrderForGoodsComponent } from './order-for-goods/order-for-goods.component';
import { PrizeComponent } from './prize/prize.component';
export { PrizeComponent } from './prize/prize.component';

import { DinomaoGameModule } from '../service/dinomao-game.module';
import { BasicUiModule } from 'resize-able-ui';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-10-22 16:40:53
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-10-22 16:43:48
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerComponent } from './lobby/banner/banner.component';
import { ProductItemComponent } from './lobby/product-item/product-item.component';
import { ProductListComponent } from './lobby/product-list/product-list.component';
import { CategoryBarComponent } from './lobby/category-bar/category-bar.component';
import { UserCenterItemComponent } from './my/user-center/user-center-item/user-center-item.component';
import { BankItemComponent } from './shop/bank-item/bank-item.component';
import { TicketItemComponent } from './shop/ticket-item/ticket-item.component';
import { VipLevelListComponent } from './shop/vip-level-list/vip-level-list.component';
import { ControlBarComponent } from './video/control-bar/control-bar.component';
import { ProdInfoButtonComponent } from './video/control-bar/prod-info-button/prod-info-button.component';
import { PlayButtonComponent } from './video/control-bar/play-button/play-button.component';
import { RecordItemComponent } from './my/video-record/record-item/record-item.component';
import { LedgerItemComponent } from './my/ledger/ledger-item/ledger-item.component';
import { AddressItemComponent } from './my/address/address-item/address-item.component';
import { AddressEditInputComponent } from './my/edit-address/address-edit-input/address-edit-input.component';
import { AddressEditTextAreaComponent } from './my/edit-address/address-edit-text-area/address-edit-text-area.component';
import { OrderItemComponent } from './order-for-goods/order-item/order-item.component';
import { PrizeItemComponent } from './prize/prize-item/prize-item.component';

@NgModule({
  imports: [
    CommonModule,BasicUiModule,DinomaoGameModule
  ],
  declarations: [LobbyComponent,ShopComponent,StartUpComponent,VideoComponent,AboutUsComponent,ContactUsComponent,SoundAndLogoutComponent,UserCenterComponent,
    BannerComponent,ProductItemComponent,ProductListComponent,CategoryBarComponent,UserCenterItemComponent,
    BankItemComponent,TicketItemComponent,VipLevelListComponent,ControlBarComponent,ProdInfoButtonComponent,
    PlayButtonComponent,VideoRecordComponent,RecordItemComponent,RecordPlayBackComponent,LedgerComponent,LedgerItemComponent,
    AddressComponent,AddressItemComponent,LoginPageComponent,EditAddressComponent,
    AddressEditInputComponent,AddressEditTextAreaComponent,OrderForGoodsComponent,OrderItemComponent,PrizeComponent,
    PrizeItemComponent,LastWinPlayBackComponent
  ]
})
export class GamePageModule { }
