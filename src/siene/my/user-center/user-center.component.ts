/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-10 15:17:37
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-14 10:45:34
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UIComponent, BitmapData, Rectangle } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, Trigger, WebPages, User } from '../../../service/dinomao-game.module';

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
  headMask!: BitmapData;
  vipIcon!: BitmapData;

  plusBtn!: BitmapData;

  coinsRect: Rectangle = new Rectangle().init( 553, 48, 114, 45 );
  coinNumber: number = 0;
  ticketsRect: Rectangle = new Rectangle().init( 553, 128, 114, 45 );
  ticketNumber: number = 0;
  textColor: number = 0xFFFFFF;
  textSize: number = 35;
  headIcon: string = "assets/default_head.png";

  isVip: boolean = false;
  
  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/user_center/user_center.json";
  }

  initUI() {
    this.coinBg = this.textureData.getTexture( "bg", 500, 40 );
    this.ticketBg = this.textureData.getTexture( "bg", 500, 120 );
    this.coinIcon = this.textureData.getTexture( "icon_coin", 502, 43 );
    this.ticketIcon = this.textureData.getTexture( "icon_ticket", 497, 125 );
    this.plusBtn = this.textureData.getTexture( "btn_plus", 669, 43 );
    this.headMask = this.textureData.getTexture( "lobby_04", 19, 29 );
    this.vipIcon = this.textureData.getTexture( "icon_vip", 100, 115 );

    Loading.status = 2;

    this.onUserDataChange();
    // this.onUserCoinChange( true );
  }

  onUserDataChange(){
    if( this.ticketNumber != User.instance.tickets ) this.ticketNumber = User.instance.tickets;
    if( this.headIcon != User.instance.headIcon && User.instance.headIcon ) this.headIcon = User.instance.headIcon;
    if( this.isVip != User.instance.isVip ) this.isVip = User.instance.isVip;
    this.coinNumber = User.instance.coins;
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}
  
  gotoBank(): void{
    Trigger.gotoPage( WebPages.SHOP );
  }
}
