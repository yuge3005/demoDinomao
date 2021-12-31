/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-11-16 09:55:36
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 11:27:46
*/
import { Component } from '@angular/core';
import { VideoPlayBack } from '../VideoPlayBack';
import { BitmapData } from 'resize-able-ui';
import { Trigger, WebPages, GameHttp, GM } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-last-win-play-back',
  templateUrl: './last-win-play-back.component.html',
  styleUrls: ['../record-play-back.component.css']
})
export class LastWinPlayBackComponent extends VideoPlayBack{

  preData: any;

  resultText!: BitmapData;

  constructor() { 
    super();
  }

  initUI() {
    super.initUI();
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
      this.resultText = this.textureData.getTexture( "font_winner", 350, 105 );
    }
    else{
      alert( "history data type error" );
    }
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.VIDEO, this.preData );
  }
}
