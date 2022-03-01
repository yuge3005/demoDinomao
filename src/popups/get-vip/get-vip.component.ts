/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-25 16:09:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:35:41
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Trigger, WebPages } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-get-vip',
  templateUrl: './get-vip.component.html'
})
export class GetVipComponent extends GenericModalComponent{

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "bg_access" );

    this.ui.okBtn = this.textureData.getTexture( "btn_go now", 174, 645 );
    this.ui.closeBtn = this.textureData.getTexture( "btn_close", 560, 110 );
  }

  getVip(){
    Trigger.gotoPage( WebPages.SHOP, "vip" );
    this.closePo();
  }
}
