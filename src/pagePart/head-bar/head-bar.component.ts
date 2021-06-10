import { stringify } from '@angular/compiler/src/util';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-26 13:36:53
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-06-10 11:27:24
 */
import { UserDataService } from './../../service/user-data.service';
import { UIComponent } from './../../siene/UIComponent';
import { BitmapData } from '../../basicUI/image/bitmap-data';
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rectangle } from 'src/basicUI/geom/rectangle';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent extends UIComponent implements OnDestroy{

  topBarBg!: BitmapData;
  coinsBg1!: BitmapData;
  coinsBg2!: BitmapData;
  headMask!: BitmapData;
  vipIcon!: BitmapData;
  letter!: BitmapData;
  coin!: BitmapData;
  ticket!: BitmapData;
  plus!: BitmapData;

  coinsRect: Rectangle = new Rectangle( 212, 28, 108, 40 );
  coinNumber: number = 0;
  ticketsRect: Rectangle = new Rectangle( 475, 28, 125, 40 );
  ticketNumber: number = 0;
  textColor: number = 0xFFFFFF;
  textSize: number = 35;
  headIcon: string = "";

  constructor(public http: HttpClient, private user: UserDataService) {
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
    this.user.dataChange = this.onUserDataChange.bind( this );
  }

  onUserDataChange(){
    if( this.coinNumber != this.user.coins ) this.coinNumber = this.user.coins;
    if( this.ticketNumber != this.user.tickets ) this.ticketNumber = this.user.tickets;
    if( this.headIcon != this.user.headIcon ) this.headIcon = this.user.headIcon;
  }

  ngOnDestroy(): void {
    this.user.dataChange = null;
  }
}
