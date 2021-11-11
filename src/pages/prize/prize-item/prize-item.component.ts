/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-10 10:39:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 10:29:26
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem } from '../../../basicUI/basic-ui.module';
import { Trigger, FormartDatas } from '../../../service/dinomao-game.module';

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

  timeoutId: any;

  sellBtn!: BitmapData;
  packBtn!: BitmapData;
  
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
      this.setLeftTime( itemExpireTime );
      this.sellBtn = this.textureData.getTexture( "prize-enter", 540, 108 );
      this.packBtn = this.textureData.getTexture( "prize-enter2", 620, 103 );
    }
  }

  OnDestroy(){
    clearTimeout( this.timeoutId );
  }

  showInfo(){
    Trigger.popupManager.showProductInfo( this.itemData );
  }

  setLeftTime( itemExpireTime: Date ){
    let left: number = itemExpireTime.getTime() - new Date().getTime();
    if( left <= 0 ){
      this.isExpire = true;
      clearTimeout( this.timeoutId );
    }
    else{
      left = Math.floor(left/60000);
      let m: number = left % 60;
      let h: number = Math.floor( left / 60 ) % 24;
      let d: number = Math.floor( left / 60 / 24 );
      this.expireTime = "expires in " + FormartDatas.toFormatString( itemExpireTime, `${d}d${h}h${m}m` );
    }
    this.timeoutId = setTimeout( this.setLeftTime.bind( this ), 60000, itemExpireTime );
  }

  sellTicket(){
    Trigger.popupManager.showExchange();
  }

  packageItems(){
    
  }
}