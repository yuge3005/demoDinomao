/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 15:37:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 11:14:18
 */
import { Component } from '@angular/core';
import { BitmapData, StyleX } from 'resize-able-ui';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-video-record',
  templateUrl: './video-record.component.html'
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

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.styles.videoList = StyleX.combine( StyleX.borderRadius(28), StyleX.setItemPosition(10,220), StyleX.backgroundColor(0xFDC43F), StyleX.border(3,0xad8321), StyleX.setSize(730,0,true,false) );
    this.styles.scrollBar = StyleX.combine( StyleX.scrollBar(), StyleX.setItemPosition(8,3), StyleX.setSize(720,0,true,false) );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  getRecordList( data: any ){
    this.recordDatas = data.data;
    Loading.status = 2;
  }
}
