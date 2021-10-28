/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-28 09:57:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-28 11:12:12
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, HttpRequest, GM } from '../../../service/dinomao-game.module';

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

  constructor( public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/about_us/about_us.json";
  }

  initUI() {
    Loading.status = 2;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
  }

  setData( data: any = null ){
    if( data.created ){
      this.recordData = data.data;
      this.prePage = WebPages.VIDEO_RECORD;
    }
    else {
      if( data.mac_addr ){
        this.preData = data;
        this.prePage = WebPages.VIDEO;
        new HttpRequest().loadData( "apis/v1/user/videos/latest/" + data.mac_addr + "?" + GM.interfaceString + "&n=1", this.getHistoryList.bind(this), "GET", "" );
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
