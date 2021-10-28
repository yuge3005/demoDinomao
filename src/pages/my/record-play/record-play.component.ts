/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-28 09:57:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-28 10:02:59
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, TextData, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-play',
  templateUrl: './record-play.component.html',
  styleUrls: ['./record-play.component.css']
})
export class RecordPlayComponent extends MainPage{

  backBtn!: BitmapData;

  constructor( public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/about_us/about_us.json";
  }

  initUI() {
    Loading.status = 2;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }
}
