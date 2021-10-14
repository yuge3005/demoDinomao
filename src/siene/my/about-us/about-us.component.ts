/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-14 14:46:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-14 13:38:05
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, TextData, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent extends MainPage {
  gameIcon!: BitmapData;
  backBtn!: BitmapData;
  title!: BitmapData;

  gameNameText!: TextData;
  versionText!: TextData;
  gameNameString!: string;
  versionString!: string;
  
  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/about_us/about_us.json";
  }

  initUI() {
    Loading.status = 2;

    this.gameIcon = this.textureData.getTexture( "about-icon", 265, 550 );
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.title = this.textureData.getTexture( "about-us", 265, 147 );

    this.gameNameText = this.textureJson.game;
    this.versionText = this.textureJson.version;

    this.gameNameString = "Dinomao";
    this.versionString = "Version " + GM.configs.version;
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }
}
