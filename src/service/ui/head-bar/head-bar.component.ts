/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-26 13:36:53
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-01 10:49:23
*/
import { trace } from '../../gameUILogic/trace';
import { User } from '../../user/User';
import { Trigger } from '../../gameUILogic/Trigger';
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
  dailyBonus!: BitmapData;
  coin!: BitmapData;
  ticket!: BitmapData;
  plus!: BitmapData;

  coinsRect: Rectangle = new Rectangle().init( 212, 28, 108, 40 );
  coinNumber: number = 0;
  ticketsRect: Rectangle = new Rectangle().init( 475, 28, 125, 40 );
  ticketNumber: number = 0;
  textColor: number = 0xFFFFFF;
  textSize: number = 35;
  headIcon: string = "assets/default_head.png";

  isVip: boolean = false;

  coinAnimationStart!: number;
  coinStartNumber!: number;
  coinAnimationDuration: number = 500;
  coinAnimationId: any;

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
    this.dailyBonus = this.textureData.getTexture( "icon_daily bones", 660, 10 );
    this.coin = this.textureData.getTexture( "icon_coin", 158, 23 );
    this.ticket = this.textureData.getTexture( "icon_ticket", 404, 21 );
    this.plus = this.textureData.getTexture( "btn_plus", 322, 22 );

    this.onUserDataChange();
    User.instance.dataChange = this.onUserDataChange.bind( this );
    this.onUserCoinChange( true );
    User.instance.coinChange = this.onUserCoinChange.bind( this );
  }

  onUserDataChange(){
    if( this.ticketNumber != User.instance.tickets ) this.ticketNumber = User.instance.tickets;
    if( this.headIcon != User.instance.headIcon && User.instance.headIcon ) this.headIcon = User.instance.headIcon;
    if( this.isVip != User.instance.isVip ) this.isVip = User.instance.isVip;
  }

  onUserCoinChange( changeImmediately: boolean = false ){
    let newCoinNumber: number = User.instance.coins;
    trace.log( newCoinNumber );
    trace.log( changeImmediately );
    if( isNaN( newCoinNumber ) ) {
      trace.log( "coins number error" );
      return;
    }
    if( this.coinNumber != newCoinNumber ){
      if( changeImmediately ){
        this.coinNumber = newCoinNumber;
      }
      else{
        this.coinAnimationStart = new Date().getTime();
        this.coinStartNumber = this.coinNumber;
        this.coinAnimationId = setInterval( this.coinsChangeProcess.bind( this ), 33 )
      }
    }
  }

  private coinsChangeProcess(){
    let nowTime: number = new Date().getTime();
    let passTime: number = nowTime - this.coinAnimationStart;
    if( passTime < this.coinAnimationDuration ){
      this.coinNumber = Math.round( passTime / this.coinAnimationDuration * ( User.instance.coins - this.coinStartNumber ) + this.coinStartNumber );
    }
    else{
      this.coinNumber = User.instance.coins;
      clearInterval( this.coinAnimationId );
    }
  }

  ngOnDestroy(): void {
    User.instance.dataChange = null;
    User.instance.coinChange = null;
    clearInterval( this.coinAnimationId );
  }

  getDailyBonus(): void{
    Trigger.showDailyBonus();
  }
}
