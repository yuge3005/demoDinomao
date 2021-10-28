/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 15:37:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-28 16:13:48
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, HttpRequest, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-video-record',
  templateUrl: './video-record.component.html',
  styleUrls: ['./video-record.component.css']
})
export class VideoRecordComponent extends MainPage {
  
  backBtn!: BitmapData;
  title!: BitmapData;

  recordDatas!: any[];

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/video_record/video_record.json";
  }

  initUI() {
    Loading.status = 1;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 125 );
    this.title = this.textureData.getTexture( "VIDEOS", 294, 150 );

    new HttpRequest().loadData( "apis/v1/user/videos?" + GM.interfaceString + "&weeks=3&created=desc", this.getRecordList.bind(this), "GET", "" );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  getRecordList( data: any ){
    this.recordDatas = data.data;
    Loading.status = 2;
  }
}
