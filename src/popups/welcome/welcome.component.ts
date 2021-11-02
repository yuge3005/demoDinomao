/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-12 11:38:30
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 10:38:40
*/
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { TextData, GenericModalComponent, User } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent extends GenericModalComponent{

  title!: BitmapData;
  present!: BitmapData;
  okBtn!: BitmapData;

  coinText!: TextData;
  coinNumberText!: string;

  coinStText!: TextData;
  coinStringText!: string;

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "blank_bg" );

    this.title = this.buildUI( this.textureJson.title );
    this.present = this.buildUI( this.textureJson.present );

    this.okBtn = this.buildUI( this.textureJson.okBtn );

    this.coinText = this.textureJson.coin;
    this.coinNumberText = User.instance.coins + '';
    this.coinStText = this.textureJson.coinStr;
    this.coinStringText = "coins";
  }
}
