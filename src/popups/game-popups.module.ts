import { DailyItemComponent } from './daily-bonus/daily-item/daily-item.component';
import { DinomaoGameModule } from './../service/dinomao-game.module';
import { BasicUiModule } from '../basicUI/basic-ui.module';
import { DailyBonusComponent } from './daily-bonus/daily-bonus.component';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-21 16:24:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-21 16:40:23
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,BasicUiModule,DinomaoGameModule
  ],
  declarations: [DailyBonusComponent,DailyItemComponent],
  exports:[DailyBonusComponent],
})
export class GamePopupsModule { }
