/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-16 13:14:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-14 13:38:17
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData, SoundManager } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, TextData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-sound-and-logout',
  templateUrl: './sound-and-logout.component.html',
  styleUrls: ['./sound-and-logout.component.css']
})
export class SoundAndLogoutComponent extends MainPage {
  backBtn!: BitmapData;
  logoutBtn!: BitmapData;
  title!: BitmapData;

  soundEffectOnBtn!: BitmapData;
  soundOnBtn!: BitmapData;
  soundEffectOffBtn!: BitmapData;
  soundOffBtn!: BitmapData;

  soundEffectSettingBg!: BitmapData;
  musicSettingBg!: BitmapData;
  soundEffectText!: TextData;
  musicText!: TextData;
  soundEffectString: string = "Sound effect";
  musicString: string = "Music";

  get soundOn(): boolean{
    return SoundManager.soundOn;
  }

  get soundEffectOn(): boolean{
    return SoundManager.soundEfOn;
  }

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/sound_and_logout/sound_and_logout.json";
  }

  initUI() {
    Loading.status = 2;

    this.logoutBtn = this.textureData.getTexture( "log out", 283, 1208 );
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.title = this.textureData.getTexture( "SETTINGS", 265, 147 );
    this.soundEffectSettingBg = this.textureData.getTexture( "bg", 15, 242 );
    this.musicSettingBg = this.textureData.getTexture( "bg", 15, 386 );

    this.soundEffectOnBtn = this.textureData.getTexture( "open", 580 ,266 );
    this.soundOnBtn = this.textureData.getTexture( "open", 580, 410 );
    this.soundEffectOffBtn = this.textureData.getTexture( "close", 580 ,266 );
    this.soundOffBtn = this.textureData.getTexture( "close", 580, 410 );

    this.soundEffectText = this.textureJson.soundEffect;
    this.musicText = this.textureJson.misic;
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  logout(){
    Trigger.popupManager.showLogout();
  }

  setSoundEffect( isOn: boolean ){
    SoundManager.soundEfOn = !isOn;
  }

  setMusic( isOn: boolean ){
    SoundManager.soundOn = !isOn;
  }
}
