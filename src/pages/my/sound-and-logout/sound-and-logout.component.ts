/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-16 13:14:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 15:41:47
 */
import { Component } from '@angular/core';
import { SoundManager, StyleX } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, TextData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-sound-and-logout',
  templateUrl: './sound-and-logout.component.html'
})
export class SoundAndLogoutComponent extends MainPage {

  soundEffectText!: TextData;
  musicText!: TextData;
  soundEffectString: string = "Sound effect";
  musicString: string = "Music";

  get soundOn(): boolean{
    return SoundManager.backgroundMusicOn;
  }

  get soundEffectOn(): boolean{
    return SoundManager.soundEfOn;
  }

  constructor() {
    super();
    this.textureUrl = "assets/sound_and_logout/sound_and_logout.json";
  }

  initUI() {
    Loading.status = 2;

    this.ui.logoutBtn = this.textureData.getTexture( "log out", 283, 0 );
    this.ui.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.ui.title = this.textureData.getTexture( "SETTINGS", 265, 147 );
    this.ui.soundEffectSettingBg = this.textureData.getTexture( "bg", 15, 242 );
    this.ui.musicSettingBg = this.textureData.getTexture( "bg", 15, 386 );

    this.ui.soundEffectOnBtn = this.textureData.getTexture( "open", 580 ,266 );
    this.ui.soundOnBtn = this.textureData.getTexture( "open", 580, 410 );
    this.ui.soundEffectOffBtn = this.textureData.getTexture( "close", 580 ,266 );
    this.ui.soundOffBtn = this.textureData.getTexture( "close", 580, 410 );

    this.soundEffectText = this.textureJson.soundEffect;
    this.musicText = this.textureJson.misic;

    this.sty.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.sty.lightTextShadow = StyleX.textShadow( 2, 2, 4, 0x333333 );
    this.sty.bottom = StyleX.setItemPosition( 0, 250, false, true );
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
    SoundManager.backgroundMusicOn = !isOn;
  }
}
