/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-10 10:39:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-10 11:54:07
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
  
  constructor() {
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "bg" );
    this.imageFrame = this.textureData.getTexture( "object_info", 25, 10 );
    this.infoIcon = this.textureData.getTexture( "btn_info", 145, 130 );

    let date: Date = FormartDatas.transformUTCStringToDate( this.itemData.created );
    this.createTime = date.toISOString();
    this.createTime = this.createTime.replace( "T", " " );
    this.createTime = this.createTime.replace( /\..*/, "" );
  }

  showInfo(){
    Trigger.popupManager.showProductInfo( this.itemData );
  }
}