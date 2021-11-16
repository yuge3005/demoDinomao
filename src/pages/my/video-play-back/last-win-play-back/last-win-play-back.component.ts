/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-16 09:55:36
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-16 10:10:59
 */
import { Component } from '@angular/core';
import { BitmapData, Application } from '../../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-last-win-play-back',
  templateUrl: './last-win-play-back.component.html',
  styleUrls: ['./last-win-play-back.component.css']
})
export class LastWinPlayBackComponent extends MainPage{

  backBtn!: BitmapData;
  recordData: any;
  preData: any;
  productImg: string = "";

  topPannel!: BitmapData;
  bottomPannel!: BitmapData;
  productFrame!: BitmapData;
  resultText!: BitmapData;
  shareIcon!: BitmapData;

  processBar!: BitmapData;
  processPoint!: BitmapData;

  private isIOS: boolean = Application.system.isApp() && Application.system.isIOS;
  public get iframeHeight(): number{
    return this.pageHeight -550 + ( this.isIOS ? 25 : 0 );
  }
  
  constructor() { 
    super();
    this.textureUrl = "assets/video_ui/playback/playback.json";
  }

  initUI() {
    Loading.status = 2;

    this.topPannel = this.textureData.getTexture( "bg_up" );
    this.bottomPannel = this.textureData.getTexture( "bg_bottom" );
    this.productFrame = this.textureData.getTexture( "box_frame", 30, 40 );
    this.resultText = this.textureData.getTexture( "box_frame", 30, 135 );
    this.shareIcon = this.textureData.getTexture( "btn_share", 640, 18 );
    this.processBar = this.textureData.getTexture( "box_frame", 30, 135 );

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
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
