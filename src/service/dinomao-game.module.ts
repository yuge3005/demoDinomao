import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

export { GameConfig } from './gameSetting/GameConfig';
export { GM } from './gameSetting/GM';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class DinomaoGameModule { }
