/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 15:37:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 10:35:00
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-video-record',
  templateUrl: './video-record.component.html',
  styleUrls: ['./video-record.component.css']
})
export class VideoRecordComponent extends MainPage {
  
  backBtn!: BitmapData;
  title!: BitmapData;

  recordDatas!: any[];

  constructor() {
    super();
    this.textureUrl = "assets/video_ui/video_record/video_record.json";
  }

  initUI() {
    Loading.status = 1;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 125 );
    this.title = this.textureData.getTexture( "VIDEOS", 294, 150 );

    new GameHttp().loadData( "apis/v1/user/videos?" + GM.interfaceString + "&weeks=3&created=desc", this.getRecordList.bind(this), "GET", "" );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  getRecordList( data: any ){
    this.recordDatas = data.data;
    Loading.status = 2;
  }
}
