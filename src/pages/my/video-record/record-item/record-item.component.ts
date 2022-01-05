/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 16:42:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 12:21:31
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem, StringTransform, StyleX } from '../../../../basicUI/basic-ui.module';
import { Trigger, WebPages, trace } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.css']
})
export class RecordItemComponent extends ListItem {

  itemBg!: BitmapData;
  winIcon!: BitmapData;
  playBtn!: BitmapData;
  shareBtn!: BitmapData;

  isWin: boolean = false;

  createTime: string = "";

  constructor() { 
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "bg" );
    this.winIcon = this.textureData.getTexture( "won", 583, -5 );
    this.playBtn = this.textureData.getTexture( "btn_video", 526, 111 );
    this.shareBtn = this.textureData.getTexture( "btn_share", 622, 111 );

    this.isWin = this.itemData.result != "0";

    let date: Date = StringTransform.transformUTCStringToDate( this.itemData.created );
    this.createTime = StringTransform.dateToFormatString( date, "YYYY-MM-DD HH:MM:SS" );

    this.styles.productImg = StyleX.combine( StyleX.borderRadius(34), StyleX.setItemRect(20,20,150,150) );
    this.styles.title = StyleX.setItemPosition(200,40);
    this.styles.create = StyleX.setItemPosition(200,90);
  }

  play(){
    Trigger.gotoPage( WebPages.RECORD_PLAY, this.itemData );
  }

  share(){
    trace.share( this.itemData.video_url );
  }
}
