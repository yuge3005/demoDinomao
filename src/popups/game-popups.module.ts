/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-21 16:24:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-25 16:16:45
 */
import { PurchaseSuccessComponent } from './purchase-success/purchase-success.component';
export { PurchaseSuccessComponent } from './purchase-success/purchase-success.component';
import { WelcomeComponent } from './welcome/welcome.component';
export { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './Logout/Logout.component';
export { LogoutComponent } from './Logout/Logout.component';
import { GenericPopupComponent } from './generic-popup/generic-popup.component';
export { GenericPopupComponent } from './generic-popup/generic-popup.component';
import { GenericPoComponent } from './generic-po/generic-po.component';
export { GenericPoComponent } from './generic-po/generic-po.component';
import { ForceUpdateComponent } from './force-update/force-update.component';
export { ForceUpdateComponent } from './force-update/force-update.component';
import { DailyBonusComponent } from './daily-bonus/daily-bonus.component';
export { DailyBonusComponent } from './daily-bonus/daily-bonus.component';
import { ProductInfoComponent } from './product-info/product-info.component';
export { ProductInfoComponent } from './product-info/product-info.component';
import { GetVipComponent } from './get-vip/get-vip.component';
export { GetVipComponent } from './get-vip/get-vip.component';

import { DailyItemComponent } from './daily-bonus/daily-item/daily-item.component';

import { BasicUiModule } from '../basicUI/basic-ui.module';
import { DinomaoGameModule } from '../service/dinomao-game.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,BasicUiModule,DinomaoGameModule
  ],
  declarations: [DailyBonusComponent,DailyItemComponent,ForceUpdateComponent,GenericPoComponent,GenericPopupComponent,LogoutComponent,ProductInfoComponent,PurchaseSuccessComponent,WelcomeComponent,GetVipComponent]
})
export class GamePopupsModule { }
