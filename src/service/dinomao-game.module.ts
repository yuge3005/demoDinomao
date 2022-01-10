/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-02 09:33:26
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-22 16:57:00
*/
export { ControlDirection } from './gameData/ControlDirection';
export { FeatureVo } from './gameData/featrue-vo';
export { GameLoginType } from './gameData/GameLoginType';
export { GamePlatform } from './gameData/GamePlatform';
export { GoodsData } from './gameData/goods-data';
export { CategoryData } from './gameData/category-data';
export { PopupVoType } from './gameData/popup-vo-type';
export { PopupVo } from './gameData/popup-vo';
export { TextData } from './gameData/TextData';
export { UserCenterItemTypes } from './gameData/user-center-item-types';
export { ShopType } from './gameData/ShopType';
export { AddressData } from './gameData/address-data';

export { GM } from './gameSetting/GM';

export { Loading } from './gameUILogic/Loading';
export { ModalCommands } from './gameUILogic/ModalCommands';
export { Purchase } from './gameUILogic/Purchase';
export { trace } from './gameUILogic/trace';
export { Trigger } from './gameUILogic/Trigger';
export { WebPages } from './gameUILogic/WebPages';

export { GameHttp } from './net/game-http';
export { SocketIO } from './net/socketIO';

export { MainPage } from './ui/MainPage.component';
export { GenericModalComponent } from './ui/generic-modal.component';

export { FacebookData } from './user/FacebookData';
export { User } from './user/User';
export { DailyBonus } from './user/DailyBonus';
export { UserAddress } from './user/UserAddress';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicUiModule } from 'resize-able-ui';

import { PopupTextFieldComponent } from './ui/popup-text-field/popup-text-field.component';
import { ListTextFieldComponent } from './ui/list-text-field/list-text-field.component';
import { HeadBarComponent } from './ui/head-bar/head-bar.component';
import { BottomBarComponent } from './ui/bottom-bar/bottom-bar.component';
import { ImageRotatingComponent } from './ui/image-rotating/image-rotating.component';

@NgModule({
  imports: [
    CommonModule,BasicUiModule
  ],
  declarations: [BottomBarComponent,HeadBarComponent,PopupTextFieldComponent,ListTextFieldComponent,ImageRotatingComponent],
  exports:[BottomBarComponent,HeadBarComponent,PopupTextFieldComponent,ListTextFieldComponent,ImageRotatingComponent],
  providers: []
})
export class DinomaoGameModule { }
