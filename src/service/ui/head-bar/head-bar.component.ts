/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-26 13:36:53
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 17:37:42
*/
import { trace } from '../../gameUILogic/trace';
import { User } from '../../user/User';
import { DailyBonus } from '../../user/DailyBonus';
import { Trigger } from '../../gameUILogic/Trigger';
import { WebPages } from '../../gameUILogic/UILogicDatas';
import { UIComponent, Rectangle, Application, StyleX } from '../../../basicUI/basic-ui.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent extends UIComponent{

  coinsRect: Rectangle = new Rectangle( 212, 28, 108, 40 );
  coinNumber: number = 0;
  scoreRect: Rectangle = new Rectangle( 475, 28, 125, 40 );
  scoreNumber: number = 0;
  textColor: number = 0xFFFFFF;
  textSize: number = 35;
  headIcon: string = "assets/default_head.png";

  isVip: boolean = false;

  coinAnimationStart!: number;
  coinStartNumber!: number;
  coinAnimationDuration: number = 500;
  coinAnimationId: any;

  todaysCoins: number = 0;
  dailyBonusCollected: boolean = true;

  constructor() {
    super();
    this.textureUrl = "assets/top_bar/top_bar.json";
  }

  initUI(){
    this.ui.topBarBg = this.textureData.getTexture( "ingame_title_bg", 1, 0 );
    this.ui.coinsBg1 = this.textureData.getTexture( "btn_coins_bg", 155, 20 );
    this.ui.coinsBg2 = this.textureData.getTexture( "btn_coins_bg", 415, 20 );
    this.ui.headMask = this.textureData.getTexture( "lobby_04", 16, 2 );
    this.ui.dailyBonus = this.textureData.getTexture( "icon_daily bones", 660, 8 );
    this.ui.coin = this.textureData.getTexture( "icon_coin", 158, 23 );
    this.ui.ticket = this.textureData.getTexture( "icon_ticket", 404, 21 );
    this.ui.plus = this.textureData.getTexture( "btn_plus", 322, 22 );

    this.onUserDataChange();
    User.instance.dataChange = this.onUserDataChange.bind( this );
    this.onUserCoinChange( true );
    User.instance.coinChange = this.onUserCoinChange.bind( this );
    this.onDailyBonusChange();
    DailyBonus.bonusChange = this.onDailyBonusChange.bind( this );

    this.sty.facebookHead = StyleX.combine( StyleX.setItemRect(20,6,80,80), StyleX.borderRadius(40) );
    this.sty.redPot = StyleX.combine( StyleX.setItemRect(710,10,32,32), StyleX.borderRadius(32), StyleX.noneSelect(), StyleX.backgroundColor("red") );
  }

  onUserDataChange(){
    if( this.scoreNumber != User.instance.score ) this.scoreNumber = User.instance.score;
    if( this.headIcon != User.instance.headIcon && User.instance.headIcon ) this.headIcon = User.instance.headIcon;
    if( this.isVip != User.instance.isVip ){
      this.isVip = User.instance.isVip;
      if( this.isVip ){
        let vipData: any = User.instance.vipData;
        let level: number = vipData.level;
        this.ui.vipIcon = this.textureData.getTexture( "icon_vip" + level, 80, 50 );
      }
    }
  }

  onUserCoinChange( changeImmediately: boolean = false ){
    let newCoinNumber: number = User.instance.coins;
    if( isNaN( newCoinNumber ) ) {
      trace.log( "coins number error" );
      return;
    }
    if( this.coinNumber != newCoinNumber ){
      if( changeImmediately ){
        this.coinNumber = Math.round( newCoinNumber );
      }
      else{
        this.coinAnimationStart = Application.getTimer();
        this.coinStartNumber = this.coinNumber;
        this.coinAnimationId = setInterval( this.coinsChangeProcess.bind( this ), 33 )
      }
    }
  }

  onDailyBonusChange(){
    if( DailyBonus.instance?.bonusList ) this.todaysCoins = DailyBonus.instance.bonusList[DailyBonus.instance.daysRow-1];
    if( DailyBonus.instance ) this.dailyBonusCollected = DailyBonus.instance.hasDailyBonus;
  }

  private coinsChangeProcess(){
    let nowTime: number = Application.getTimer();
    let passTime: number = nowTime - this.coinAnimationStart;
    if( passTime < this.coinAnimationDuration ){
      this.coinNumber = Math.round( passTime / this.coinAnimationDuration * ( User.instance.coins - this.coinStartNumber ) + this.coinStartNumber );
    }
    else{
      this.coinNumber = Math.round( User.instance.coins );
      clearInterval( this.coinAnimationId );
    }
  }

  ngOnDestroy(): void {
    User.instance.dataChange = null;
    User.instance.coinChange = null;
    DailyBonus.bonusChange = null;
    clearInterval( this.coinAnimationId );
  }

  getDailyBonus(): void{
    Trigger.popupManager.showDailyBonus();
  }

  gotoBank(): void{
    Trigger.gotoPage( WebPages.SHOP );
  }

  gotoUserCenter(): void{
    Trigger.gotoPage( WebPages.USER_CENTER );
  }
}
