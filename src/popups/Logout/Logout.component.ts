import { BitmapData } from './../../basicUI/image/bitmap-data';
import { Trigger } from './../../service/gameUILogic/Trigger';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-22 15:18:17
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-22 15:29:38
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericModalComponent } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-Logout',
  templateUrl: './Logout.component.html',
  styleUrls: ['./Logout.component.css']
})
export class LogoutComponent extends GenericModalComponent{

  cancelBtn!: BitmapData;
  okBtn!: BitmapData;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg_log_out" );
  }

  logout(){
    Trigger.logout();
  }
}
