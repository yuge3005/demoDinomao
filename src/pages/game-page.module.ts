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

@NgModule({
  imports: [
    CommonModule,BasicUiModule,DinomaoGameModule
  ],
  declarations: [LobbyComponent,ShopComponent,StartUpComponent,VideoComponent,AboutUsComponent,ContactUsComponent,SoundAndLogoutComponent,UserCenterComponent]
})
export class GamePageModule { }
