/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-26 13:36:53
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-02 16:14:13
 */
import { User } from '../../user/User';
import { UIComponent, Rectangle, BitmapData } from '../../../basicUI/basic-ui.module';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent extends UIComponent{

  topBarBg!: BitmapData;
  coinsBg1!: BitmapData;
  coinsBg2!: BitmapData;
  headMask!: BitmapData;
  vipIcon!: BitmapData;
  letter!: BitmapData;
  coin!: BitmapData;
  ticket!: BitmapData;
  plus!: BitmapData;

  coinsRect: Rectangle = new Rectangle().init( 212, 28, 108, 40 );
  coinNumber: number = 0;
  ticketsRect: Rectangle = new Rectangle().init( 475, 28, 125, 40 );
  ticketNumber: number = 0;
  textColor: number = 0xFFFFFF;
  textSize: number = 35;
  headIcon: string = "assets/default_head.jpg";

  isVip: boolean = false;

  constructor(public http: HttpClient) {
    super(http);
    this.textureUrl = "assets/top_bar/top_bar.json";
  }

  initUI(){
    this.topBarBg = this.textureData.getTexture( "ingame_title_bg" );
    this.coinsBg1 = this.textureData.getTexture( "btn_coins_bg", 155, 20 );
    this.coinsBg2 = this.textureData.getTexture( "btn_coins_bg", 415, 20 );
    this.headMask = this.textureData.getTexture( "lobby_04", 12, 10 );
    this.vipIcon = this.textureData.getTexture( "icon_vip", 66, 52 );
    this.letter = this.textureData.getTexture( "btn_letter", 640, 10 );
    this.coin = this.textureData.getTexture( "icon_coin", 158, 23 );
    this.ticket = this.textureData.getTexture( "icon_ticket", 404, 21 );
    this.plus = this.textureData.getTexture( "btn_plus", 322, 22 );

    this.onUserDataChange();
    User.instance.dataChange = this.onUserDataChange.bind( this );
  }

  onUserDataChange(){
    if( this.coinNumber != User.instance.coins ) this.coinNumber = User.instance.coins;
    if( this.ticketNumber != User.instance.tickets ) this.ticketNumber = User.instance.tickets;
    if( this.headIcon != User.instance.headIcon && User.instance.headIcon ) this.headIcon = User.instance.headIcon;
    if( this.isVip != User.instance.isVip ) this.isVip = User.instance.isVip;
  }

  ngOnDestroy(): void {
    User.instance.dataChange = null;
  }
}
