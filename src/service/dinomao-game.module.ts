/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-02 09:33:26
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-02 14:02:24
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModalComponent } from './ui/generic-modal.component';
export { GenericModalComponent } from './ui/generic-modal.component';

export { ControlDirection } from './gameData/ControlDirection';
export { ExternalData } from './gameData/external-data';
export { FeatureVo } from './gameData/featrue-vo';
export { GameLoginType } from './gameData/GameLoginType';
export { GamePlatform } from './gameData/GamePlatform';
export { GoodsData } from './gameData/goods-data';
export { PopupVo } from './gameData/popup-vo';
export { ProductData } from './gameData/product-data';
export { TextData } from './gameData/TextData';
export { UIData } from './gameData/UIData';
export { UserData } from './gameData/user-data';

export { GM } from './gameSetting/GM';

export { Loading } from './gameUILogic/Loading';
export { ModalCommands } from './gameUILogic/ModalCommands';
export { PopupStatus } from './gameUILogic/PopupStatus';
export { Purchase } from './gameUILogic/Purchase';
export { trace } from './gameUILogic/trace';
export { Trigger } from './gameUILogic/Trigger';
export { TriggerNames } from './gameUILogic/TriggerNames';

export { HttpRequest } from './net/http-request';
export { SocketIO } from './net/socketIO';

export { KeyValue } from './tool/KeyValue';

export { FacebookData } from './user/FacebookData';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GenericModalComponent],
  exports:[GenericModalComponent]
})
export class DinomaoGameModule { }
