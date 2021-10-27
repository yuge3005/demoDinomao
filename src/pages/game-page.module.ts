/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-25 10:19:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-27 17:16:51
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
import { StartUpComponent } from './start-up/start-up.component';
export { StartUpComponent } from './start-up/start-up.component';
import { ShopComponent } from './shop/shop/shop.component';
export { ShopComponent } from './shop/shop/shop.component';
import { LobbyComponent } from './lobby/lobby/lobby.component';
export { LobbyComponent } from './lobby/lobby/lobby.component';
import { VideoRecordComponent } from './my/video-record/video-record.component';
export { VideoRecordComponent } from './my/video-record/video-record.component';

import { DinomaoGameModule } from '../service/dinomao-game.module';
import { BasicUiModule } from '../basicUI/basic-ui.module';
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
import { ReactiveFormsModule } from '@angular/forms';

import { BannerComponent } from './lobby/banner/banner.component';
import { ProductItemComponent } from './lobby/product-item/product-item.component';
import { ProductListComponent } from './lobby/product-list/product-list.component';
import { ProductScrollListComponent } from './lobby/product-scroll-list/product-scroll-list.component';
import { UserCenterItemComponent } from './my/user-center/user-center-item/user-center-item.component';
import { UserCenterScrollListComponent } from './my/user-center/user-center-scroll-list/user-center-scroll-list.component';
import { BankItemComponent } from './shop/bank-item/bank-item.component';
import { BankScrollListComponent } from './shop/bank-scroll-list/bank-scroll-list.component';
import { TicketItemComponent } from './shop/ticket-item/ticket-item.component';
import { TicketScrollListComponent } from './shop/ticket-scroll-list/ticket-scroll-list.component';
import { VipLevelListComponent } from './shop/vip-level-list/vip-level-list.component';
import { ControlBarComponent } from './video/control-bar/control-bar.component';
import { ProdInfoButtonComponent } from './video/control-bar/prod-info-button/prod-info-button.component';
import { PlayButtonComponent } from './video/control-bar/play-button/play-button.component';
import { RecordListComponent } from './my/video-record/record-list/record-list.component';
import { RecordItemComponent } from './my/video-record/record-item/record-item.component';

@NgModule({
  imports: [
    CommonModule,BasicUiModule,DinomaoGameModule,ReactiveFormsModule
  ],
  declarations: [LobbyComponent,ShopComponent,StartUpComponent,VideoComponent,AboutUsComponent,ContactUsComponent,SoundAndLogoutComponent,UserCenterComponent,
    BannerComponent,ProductItemComponent,ProductListComponent,ProductScrollListComponent,UserCenterItemComponent,UserCenterScrollListComponent,BankItemComponent,
    BankScrollListComponent,TicketItemComponent,TicketScrollListComponent,VipLevelListComponent,ControlBarComponent,ProdInfoButtonComponent,PlayButtonComponent,
    VideoRecordComponent,RecordListComponent,RecordItemComponent]
})
export class GamePageModule { }
