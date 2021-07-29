import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export { GoodsData } from './gameData/goods-data';
export { GameConfig } from './gameSetting/GameConfig';
export { GM } from './gameSetting/GM';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class DinomaoGameModule { }
