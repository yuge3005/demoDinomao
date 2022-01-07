/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-14 14:46:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 16:36:37
*/
import { Component } from '@angular/core';
import { BitmapData, StyleX } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, TextData, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html'
})
export class AboutUsComponent extends MainPage {
  gameIcon!: BitmapData;
  backBtn!: BitmapData;
  title!: BitmapData;

  gameNameText!: TextData;
  versionText!: TextData;
  gameNameString!: string;
  versionString!: string;
  
  constructor() {
    super();
    this.textureUrl = "assets/about_us/about_us.json";
  }

  initUI() {
    Loading.status = 2;

    this.gameIcon = this.textureData.getTexture( "about-icon", 140, 0 );
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.title = this.textureData.getTexture( "about-us", 265, 147 );

    this.gameNameText = this.textureJson.game;
    this.versionText = this.textureJson.version;

    this.gameNameString = "Dinomao";
    this.versionString = "Version " + GM.configs.version;

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.styles.mOffset = StyleX.combine( StyleX.anchorOffset( 250, 200 ), StyleX.center(), StyleX.textShadow(2,2,4,0x333333) );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }
}
