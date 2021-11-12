/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-28 09:57:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 10:35:41
 */
import { Component } from '@angular/core';
import { BitmapData } from 'resize-able-ui/lib/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-play',
  templateUrl: './record-play.component.html',
  styleUrls: ['./record-play.component.css']
})
export class RecordPlayComponent extends MainPage{

  backBtn!: BitmapData;
  recordData: any;
  preData: any;
  prePage: string = "";

  constructor() {
    super();
    this.textureUrl = "assets/about_us/about_us.json";
  }

  initUI() {
    Loading.status = 2;

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
}
