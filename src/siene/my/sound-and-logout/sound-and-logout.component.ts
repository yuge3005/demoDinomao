/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-16 13:14:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-16 14:28:10
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UIComponent, BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, TextData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-sound-and-logout',
  templateUrl: './sound-and-logout.component.html',
  styleUrls: ['./sound-and-logout.component.css']
})
export class SoundAndLogoutComponent extends UIComponent implements MainPage {
  pageHeight: number = 0;

  backBtn!: BitmapData;
  logoutBtn!: BitmapData;
  title!: BitmapData;

  soundEffectSettingBg!: BitmapData;
  musicSettingBg!: BitmapData;
  soundEffectText!: TextData;
  musicText!: TextData;
  soundEffectString: string = "";
  musicString: string = "";

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/sound_and_logout/sound_and_logout.json";
  }

  initUI() {
    Loading.status = 2;

    this.logoutBtn = this.textureData.getTexture( "log out", 265, 550 );
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.title = this.textureData.getTexture( "SETTINGS", 265, 147 );
    this.soundEffectSettingBg = this.textureData.getTexture( "bg", 15, 242 );
    this.musicSettingBg = this.textureData.getTexture( "bg", 15, 386 );

  }
  
  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  logout(){
    Trigger.logout();
  }
}
