/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-19 15:35:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-01 15:11:49
 */
import { StageScaleMode } from './../basicUI/settings/StageScaleMode';
import { StageOrientationMode } from './../basicUI/settings/StageOrientationMode';
import { Application } from 'src/basicUI/settings/Application';
import { Component } from '@angular/core';

declare var firebase:any;

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

    var firebaseConfig = {
      apiKey: "AIzaSyDQHur-IYOTJhIkwQnvqGapgaA2U4Nx7q4",
      authDomain: "dinomao-ios-1536724073255.firebaseapp.com",
      databaseURL: "https://dinomao-ios-1536724073255.firebaseio.com",
      projectId: "dinomao-ios-1536724073255",
      storageBucket: "dinomao-ios-1536724073255.appspot.com",
      messagingSenderId: "493599140751",
      appId: "1:493599140751:web:9eddb54dd18f4c4c9539fa",
      measurementId: "G-Y2T3B9Y5QL"
    };
      // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
