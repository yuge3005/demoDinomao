/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-10 15:17:37
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-14 09:57:50
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UIComponent, BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent extends UIComponent implements MainPage {

  pageHeight: number = 0;

  coinBg!: BitmapData;
  ticketBg!: BitmapData;
  coinIcon!: BitmapData;
  ticketIcon!: BitmapData;

  plusBtn!: BitmapData;
  
  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/user_center/user_center.json";
  }

  initUI() {
    this.coinBg = this.textureData.getTexture( "bg", 500, 40 );
    this.ticketBg = this.textureData.getTexture( "bg", 500, 120 );
    this.coinIcon = this.textureData.getTexture( "icon_coin", 502, 43 );
    this.ticketIcon = this.textureData.getTexture( "icon_ticket", 497, 123 );
    this.plusBtn = this.textureData.getTexture( "btn_plus", 669, 43 );

    Loading.status = 2;
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}
}
