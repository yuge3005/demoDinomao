/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-19 15:35:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-07 15:03:26
 */
import { StageScaleMode } from './../basicUI/settings/StageScaleMode';
import { StageOrientationMode } from './../basicUI/settings/StageOrientationMode';
import { Application } from 'src/basicUI/settings/Application';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoDinomao';

  constructor(){
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
      Application.system.isIOS = window.location.href.indexOf( "=iOS" ) > 0;
    }
  }
}
