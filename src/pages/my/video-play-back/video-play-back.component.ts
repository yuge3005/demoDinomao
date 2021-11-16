import { trace } from './../../../service/gameUILogic/trace';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-28 09:57:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-16 09:50:03
 */
import { Component } from '@angular/core';
import { BitmapData, Application } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-video-play-back',
  templateUrl: './video-play-back.component.html',
  styleUrls: ['./video-play-back.component.css']
})
export class VideoPlayBackComponent extends MainPage{

  backBtn!: BitmapData;
  recordData: any;
  preData: any;
  prePage: string = "";
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
    if( data.created ){
      this.recordData = data;
      this.prePage = WebPages.VIDEO_RECORD;
    }
    else {
      if( data.mac_addr ){
        this.preData = data;
        this.prePage = WebPages.VIDEO;
        new GameHttp().loadData( "apis/v1/user/videos/latest/" + data.mac_addr + "?" + GM.interfaceString + "&n=1&result=1", this.getHistoryList.bind(this), "GET", "" );
      }
      else{
        alert( "history data error" );
      }
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
    Trigger.gotoPage( this.prePage, this.preData );
  }

  shareVideo(){
    trace.share( this.recordData.video_url );
  }
}
