/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-19 15:35:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 14:39:59
*/
import { Component } from '@angular/core';
import { ResizeAble, Application, StageScaleMode, StageOrientationMode, SoundManager, StyleX } from 'resize-able-ui';
import { trace, Trigger } from '../service/dinomao-game.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ResizeAble {

  title = 'demoDinomao';
  hasEnterLobby: boolean = false;
  
  mainDiv: Object = {};

  constructor(){
    super();
    Application.settings.appWidth = 750;
    Application.settings.appHeight = 1625;

    if( Application.system.isMobile() ){
      Application.settings.screenMode = StageOrientationMode.PORTRAIT;
      Application.settings.scaleMode = StageScaleMode.FIT_WIDTH;
    }
    else{
      Application.settings.screenMode = StageOrientationMode.DEFAULT;
      Application.settings.scaleMode = StageScaleMode.SHOW_ALL;
    }

    if( Application.system.isApp() ){
      Application.system.isIOS = window.location.href.indexOf( "=iOS" ) > 0 || localStorage.getItem( "platform" ) == "iOS";

      var tc = trace;
      if( !Application.system.isIOS ) eval( "document.back = tc.back" );
    }
    else{
      trace.log = console.log.bind( console );
    }

    SoundManager.defaltButtonSound = "assets/sound/button.mp3";
    let trigger = Trigger;
    eval("window.Trigger=trigger");

    Trigger.waitForEnter = this.waitForLobby.bind( this );
    this.mainDiv = StyleX.combine( StyleX.center(), StyleX.setSize(750,0,true,false), StyleX.backgroundColor(0x888888) );
  }

  waitForLobby(){
    this.hasEnterLobby = true;
    Trigger.waitForEnter = null;
  }
}
