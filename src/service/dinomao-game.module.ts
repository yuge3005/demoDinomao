/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-02 09:33:26
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-26 10:31:39
*/
export { ControlDirection } from './gameData/ControlDirection';
export { FeatureVo } from './gameData/featrue-vo';
export { GameLoginType } from './gameData/GameLoginType';
export { GamePlatform } from './gameData/GamePlatform';
export { GoodsData } from './gameData/goods-data';
export { PopupVo } from './gameData/popup-vo';
export { TextData } from './gameData/TextData';

export { GM } from './gameSetting/GM';

export { Loading } from './gameUILogic/Loading';
export { ModalCommands } from './gameUILogic/ModalCommands';
export { Purchase } from './gameUILogic/Purchase';
export { trace } from './gameUILogic/trace';
export { Trigger } from './gameUILogic/Trigger';

export { HttpRequest } from './net/http-request';
export { SocketIO } from './net/socketIO';

export { KeyValue } from './tool/KeyValue';

export { MainPage } from './ui/MainPage.component';

export { FacebookData } from './user/FacebookData';
export { User } from './user/User';
export { DailyBonus } from './user/DailyBonus';

import { FirebaseAnaliyticsService } from './firebase-analiytics.service';
export { FirebaseAnaliyticsService } from './firebase-analiytics.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicUiModule } from './../basicUI/basic-ui.module';
import { GenericModalComponent } from './ui/generic-modal.component';
export { GenericModalComponent } from './ui/generic-modal.component';
import { PopupTextFieldComponent } from './ui/popup-text-field/popup-text-field.component';
export { PopupTextFieldComponent } from './ui/popup-text-field/popup-text-field.component';
import { HeadBarComponent } from './ui/head-bar/head-bar.component';
export { HeadBarComponent } from './ui/head-bar/head-bar.component';
import { BottomBarComponent } from './ui/bottom-bar/bottom-bar.component';
export { BottomBarComponent } from './ui/bottom-bar/bottom-bar.component';

@NgModule({
  imports: [
    CommonModule,BasicUiModule
  ],
  declarations: [GenericModalComponent,BottomBarComponent,HeadBarComponent,PopupTextFieldComponent],
  exports:[GenericModalComponent,BottomBarComponent,HeadBarComponent,PopupTextFieldComponent],
  providers: [FirebaseAnaliyticsService]
})
export class DinomaoGameModule { }
