/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-28 09:57:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-16 11:22:57
 */
import { Component } from '@angular/core';
import { VideoPlayBack } from '../VideoPlayBack';
import { BitmapData, Application } from 'resize-able-ui';
import { Trigger, WebPages, Loading, GameHttp, GM, trace } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-play-back',
  templateUrl: './record-play-back.component.html',
  styleUrls: ['../record-play-back.component.css']
})
export class RecordPlayBackComponent extends VideoPlayBack{

  resultText!: BitmapData;
  shareIcon!: BitmapData;

  constructor() {
    super();
  }

  initUI() {
    super.initUI();

    this.shareIcon = this.textureData.getTexture( "btn_share", 640, 18 );

    if( this.recordData.result == "1" ) this.resultText = this.textureData.getTexture( "font_you_won", 355, 135 );
    else this.resultText = this.textureData.getTexture( "font_lose", 350, 105 );
  }

  setData( data: any = null ){
    this.recordData = data;
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.VIDEO_RECORD );
  }

  shareVideo(){
    trace.share( this.recordData.video_url );
  }
}
