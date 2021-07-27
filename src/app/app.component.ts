import { trace } from './../service/gameUILogic/trace';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-19 15:35:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-27 11:47:28
 */
import { StageScaleMode } from './../basicUI/settings/StageScaleMode';
import { StageOrientationMode } from './../basicUI/settings/StageOrientationMode';
import { Component } from '@angular/core';
import { ResizeAble, Application } from './../basicUI/basic-ui.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ResizeAble {
  title = 'demoDinomao';

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
      Application.system.isIOS = window.location.href.indexOf( "=iOS" ) > 0;
    }
    else{
      trace.log = console.log.bind( console );
    }
  }
}
