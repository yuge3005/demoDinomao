/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-25 14:53:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-25 15:53:52
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericModalComponent } from './../../service/dinomao-game.module';

@Component({
  selector: 'app-daily-bonus',
  templateUrl: './daily-bonus.component.html',
  styleUrls: ['./daily-bonus.component.css']
})
export class DailyBonusComponent extends GenericModalComponent{

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg0" );
  }
}
