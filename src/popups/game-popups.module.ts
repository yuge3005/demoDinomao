/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-10-21 16:24:20
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-10-21 17:13:24
*/
import { PurchaseSuccessComponent } from './purchase-success/purchase-success.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LogoutComponent } from './Logout/Logout.component';
import { GenericPopupComponent } from './generic-popup/generic-popup.component';
import { GenericPoComponent } from './generic-po/generic-po.component';
import { ForceUpdateComponent } from './force-update/force-update.component';
import { DailyItemComponent } from './daily-bonus/daily-item/daily-item.component';
import { DailyBonusComponent } from './daily-bonus/daily-bonus.component';

import { BasicUiModule } from '../basicUI/basic-ui.module';
import { DinomaoGameModule } from '../service/dinomao-game.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-21 16:24:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-21 16:49:31
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoComponent } from './product-info/product-info.component';

@NgModule({
  imports: [
    CommonModule,BasicUiModule,DinomaoGameModule
  ],
  declarations: [DailyBonusComponent,DailyItemComponent,ForceUpdateComponent,GenericPoComponent,GenericPopupComponent,LogoutComponent,ProductInfoComponent,PurchaseSuccessComponent,WelcomeComponent],
  exports:[DailyBonusComponent,ForceUpdateComponent,GenericPoComponent,GenericPopupComponent,LogoutComponent,ProductInfoComponent,PurchaseSuccessComponent,WelcomeComponent]
})
export class GamePopupsModule { }
