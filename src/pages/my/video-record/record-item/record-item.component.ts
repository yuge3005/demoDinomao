/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 16:42:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-04 11:18:42
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem } from '../../../../basicUI/basic-ui.module';
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

  constructor() { 
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "bg" );
    this.winIcon = this.textureData.getTexture( "won", 583, -5 );
    this.playBtn = this.textureData.getTexture( "btn_video", 526, 111 );
    this.shareBtn = this.textureData.getTexture( "btn_share", 622, 111 );

    this.isWin = this.itemData.result != "0";
  }

  play(){
    Trigger.gotoPage( WebPages.RECORD_PLAY, this.itemData );
  }

  share(){
    trace.share( this.itemData.video_url );
  }
}
