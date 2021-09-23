import { BitmapData } from './../../../basicUI/image/bitmap-data';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-23 15:22:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-23 16:12:51
*/
import { Component, Input } from '@angular/core';
import { UIFromParent } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-vip-level-list',
  templateUrl: './vip-level-list.component.html',
  styleUrls: ['./vip-level-list.component.css']
})
export class VipLevelListComponent extends UIFromParent {

  @Input() listData!: any[];

  lightImg!: BitmapData;
  vip1!: BitmapData;
  vip2!: BitmapData;
  vip3!: BitmapData;

  textBg!: BitmapData;
  crown!: BitmapData;
  hand!: BitmapData;

  buyBtn!: BitmapData;

  constructor() {
    super();
  }

  initUI(){
    this.lightImg = this.textureData.getTexture( "guang", -50, 22 );
    this.vip1 = this.textureData.getTexture( "vip1", 10, 80 );
    this.vip2 = this.textureData.getTexture( "vip2", 255, 80 );
    this.vip3 = this.textureData.getTexture( "vip3", 500, 80 );

    this.textBg = this.textureData.getTexture( "bg0", 0, 240 );
    this.crown = this.textureData.getTexture( "crown", 308, 0 );
    this.hand = this.textureData.getTexture( "hand", 420, 157 );

    this.buyBtn = this.textureData.getTexture( "btn_subscribe", 188, 1050 );
  }

  buyVip(){
    
  }
}
