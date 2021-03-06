/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-08 15:18:47
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-28 11:07:51
 */
import { Component } from '@angular/core';
import { Trigger, GenericModalComponent } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-miss-address-info',
  templateUrl: './miss-address-info.component.html',
  styleUrls: ['./miss-address-info.component.css']
})
export class MissAddressInfoComponent extends GenericModalComponent{

  tipString: string = "";

  constructor() { 
    super();
  }

  initUI(){
    super.setPopupBg( "bg_Incomplete information" );

    this.closeBtn = this.textureData.getTexture( "btn_okay", 174, 640 );

    let products: any = Trigger.popupData.products;
    let product: any = products[0];

    this.tipString = product.missingStr;
  }
}
