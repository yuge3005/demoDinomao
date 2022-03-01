/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-22 15:18:17
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:35:46
*/
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Trigger, TextData } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-Logout',
  templateUrl: './Logout.component.html'
})
export class LogoutComponent extends GenericModalComponent{

  tipText!: TextData;
  tipString: string = "";

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "bg_log_out" );

    this.ui.okBtn = this.textureData.getTexture( "btn_okay", 36, 660 );
    this.ui.closeBtn = this.textureData.getTexture( "btn_cancel", 328, 660 );

    this.tipText = this.textureJson.tipText;
    this.tipString = "Do you want to log out?";
  }

  logout(){
    Trigger.logout();
  }
}
