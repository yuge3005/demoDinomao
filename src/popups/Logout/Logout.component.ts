/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-22 15:18:17
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-09-22 17:04:47
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, Trigger, TextData } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-Logout',
  templateUrl: './Logout.component.html',
  styleUrls: ['./Logout.component.css']
})
export class LogoutComponent extends GenericModalComponent{

  okBtn!: BitmapData;

  tipText!: TextData;
  tipString: string = "";

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg_log_out" );

    this.okBtn = this.textureData.getTexture( "btn_okay", 36, 660 );
    this.closeBtn = this.textureData.getTexture( "btn_cancel", 328, 660 );

    this.tipText = this.textureJson.tipText;
    this.tipString = "Do you want to log out?";
  }

  logout(){
    Trigger.logout();
  }
}