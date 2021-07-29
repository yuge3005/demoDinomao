import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModalComponent } from './ui/generic-modal.component';
export { GenericModalComponent } from './ui/generic-modal.component';

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

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GenericModalComponent],
  exports:[GenericModalComponent]
})
export class DinomaoGameModule { }
