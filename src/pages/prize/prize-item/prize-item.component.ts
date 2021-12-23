/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-10 10:39:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-22 16:57:21
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { BitmapData, ListItem, StringTransform } from 'resize-able-ui';
import { Trigger, Loading, GameHttp, GM, User } from '../../../service/dinomao-game.module';

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

  @Output() itemDelete: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() {
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "bg" );
    this.imageFrame = this.textureData.getTexture( "object_info", 25, 10 );
    this.infoIcon = this.textureData.getTexture( "btn_info", 145, 130 );

    let itemCreatedTime: Date = StringTransform.getUTCDateByTimeStamp( Number(this.itemData.start_time*1000) );
    this.createTime = StringTransform.dateToFormatString( itemCreatedTime, "YYYY-MM-DD HH:MM:SS" );

    if( this.itemData.is_expire ) this.isExpire = true;
    else{
      let itemExpireTime: Date = StringTransform.getUTCDateByTimeStamp( Number(this.itemData.expire_time*1000) );
      this.setLeftTime( itemExpireTime );
      this.sellBtn = this.textureData.getTexture( "prize-enter", 540, 108 );
      this.packBtn = this.textureData.getTexture( "prize-enter2", 620, 103 );
    }
  }

  ngOnDestroy(){
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
      this.expireTime = "expires in " + StringTransform.dateToFormatString( itemExpireTime, `${d}d${h}h${m}m` );
    }
    this.timeoutId = setTimeout( this.setLeftTime.bind( this ), 60000, itemExpireTime );
  }

  sellTicket(){
    Trigger.popupManager.showExchange( this.itemData.change_coins, this.confirmChange.bind(this) );
  }

  confirmChange(){
    Loading.status = 1;
    new GameHttp().loadData( "cmd.php?action=shop&" + GM.interfaceString, this.afterChange.bind(this), "POST", "type=change_to_tickets&id=" + this.itemData.id );
  }

  afterChange( data: any ){
    Loading.status = 2;
    if( data && data.status == "ok" ){
      User.instance.score = data.total_play_tickets;
      this.itemDelete.emit( this.itemData );
    }
  }

  packageItems(){
    
  }
}