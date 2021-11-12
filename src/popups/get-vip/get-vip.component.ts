/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-25 16:09:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 10:37:14
 */
import { Component } from '@angular/core';
import { BitmapData } from 'resize-able-ui';
import { GenericModalComponent, Trigger, WebPages } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-get-vip',
  templateUrl: './get-vip.component.html'
})
export class GetVipComponent extends GenericModalComponent{

  okBtn!: BitmapData;

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "bg_access" );

    this.okBtn = this.textureData.getTexture( "btn_go now", 174, 645 );
    this.closeBtn = this.textureData.getTexture( "btn_close", 560, 110 );
  }

  getVip(){
    Trigger.gotoPage( WebPages.SHOP, "vip" );
    this.closePo();
  }
}
