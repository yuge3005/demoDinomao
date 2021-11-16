/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-11-16 09:55:36
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-16 11:08:05
*/
import { Component } from '@angular/core';
import { VideoPlayBack } from '../VideoPlayBack';
import { BitmapData, Application } from '../../../../basicUI/basic-ui.module';
import { Trigger, WebPages, Loading, GameHttp, GM } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-last-win-play-back',
  templateUrl: './last-win-play-back.component.html',
  styleUrls: ['../record-play-back.component.css']
})
export class LastWinPlayBackComponent extends VideoPlayBack{

  preData: any;

  resultText!: BitmapData;
  shareIcon!: BitmapData;
  
  constructor() { 
    super();
  }

  initUI() {
    super.initUI();
    this.resultText = this.textureData.getTexture( "box_frame", 30, 135 );
    this.shareIcon = this.textureData.getTexture( "btn_share", 640, 18 );
  }

  setData( data: any = null ){
    this.preData = data;
    if( data.mac_addr ){
      new GameHttp().loadData( "apis/v1/user/videos/latest/" + data.mac_addr + "?" + GM.interfaceString + "&n=1&result=1", this.getHistoryList.bind(this), "GET", "" );
    }
    else{
      alert( "history data error" );
    }
  }

  getHistoryList( data: any ){
    if( data && data.data && data.data[0] ){
      this.recordData = data.data[0];
    }
    else{
      alert( "history data type error" );
    }
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.VIDEO, this.preData );
  }
}
