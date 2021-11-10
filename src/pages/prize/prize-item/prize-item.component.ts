/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-10 10:39:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-10 16:55:31
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem } from '../../../basicUI/basic-ui.module';
import { Trigger, WebPages, trace, FormartDatas } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-prize-item',
  templateUrl: './prize-item.component.html',
  styleUrls: ['./prize-item.component.css']
})
export class PrizeItemComponent extends ListItem {
  itemBg!: BitmapData;
  imageFrame!: BitmapData;
  infoIcon!: BitmapData;

  createTime: string = "";
  expireTime: string = "";
  isExpire: boolean = false;
  
  constructor() {
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "bg" );
    this.imageFrame = this.textureData.getTexture( "object_info", 25, 10 );
    this.infoIcon = this.textureData.getTexture( "btn_info", 145, 130 );

    let itemCreatedTime: Date = FormartDatas.getUTCDateByTimeStamp( Number(this.itemData.start_time*1000) );
    this.createTime = FormartDatas.toFormatString( itemCreatedTime, "YYYY-MM-DD HH:MM:SS" );

    if( this.itemData.is_expire ) this.isExpire = true;
    else{
      let itemExpireTime: Date = FormartDatas.getUTCDateByTimeStamp( Number(this.itemData.expire_time*1000) );
      this.expireTime = FormartDatas.toFormatString( itemExpireTime, "YYYY-MM-DD HH:MM:SS" );
    }
  }

  showInfo(){
    Trigger.popupManager.showProductInfo( this.itemData );
  }
}