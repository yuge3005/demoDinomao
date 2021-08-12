/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-12 11:38:30
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-12 13:46:30
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { TextData, GenericModalComponent } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent extends GenericModalComponent{

  title!: BitmapData;
  present!: BitmapData;
  okBtn!: BitmapData;

  coinText!: TextData;
  coinNumberText!: string;

  coinStText!: TextData;
  coinStringText!: string;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "blank_bg" );
  }
}
