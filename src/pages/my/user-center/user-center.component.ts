/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-10 15:17:37
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-09 11:18:01
*/
import { Component } from '@angular/core';
import { BitmapData, Rectangle } from 'resize-able-ui/lib/basic-ui.module';
import { MainPage, Loading, Trigger, WebPages, User, TextData, UserCenterItemTypes } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent extends MainPage {
  coinBg!: BitmapData;
  ticketBg!: BitmapData;
  coinIcon!: BitmapData;
  ticketIcon!: BitmapData;
  headMask!: BitmapData;
  vipIcon!: BitmapData;

  plusBtn!: BitmapData;

  coinsRect: Rectangle = new Rectangle().init( 553, 48, 114, 45 );
  coinNumber: number = 0;
  scoreRect: Rectangle = new Rectangle().init( 553, 128, 114, 45 );
  scoreNumber: number = 0;
  textColor: number = 0xFFFFFF;
  textSize: number = 35;
  headIcon: string = "assets/default_head.png";

  isVip: boolean = false;

  userNameText!: TextData;
  userIdText!: TextData;
  userNameString!: string;
  userIdString!: string;

  userCenterItems!: any[];
  
  constructor() {
    super();
    this.textureUrl = "assets/user_center/user_center.json";
  }

  initUI() {
    this.coinBg = this.textureData.getTexture( "bg", 500, 40 );
    this.ticketBg = this.textureData.getTexture( "bg", 500, 120 );
    this.coinIcon = this.textureData.getTexture( "icon_coin", 502, 43 );
    this.ticketIcon = this.textureData.getTexture( "icon_ticket", 497, 125 );
    this.plusBtn = this.textureData.getTexture( "btn_plus", 669, 43 );
    this.headMask = this.textureData.getTexture( "lobby_04", 19, 39 );

    this.userNameText = this.textureJson.userName;
    this.userIdText = this.textureJson.userId;
    this.userNameString = User.instance.name;
    this.userIdString = User.instance.id;

    Loading.status = 2;

    this.onUserDataChange();

    this.userCenterItems = [
      { icon: "icon_status", tip: "VIP status", itemType: UserCenterItemTypes.VIP },
      { icon: "icon_orders", tip: "My orders", itemType: UserCenterItemTypes.ORDER },
      { icon: "icon_address", tip: "My address", itemType: UserCenterItemTypes.ADDRESS },
      { icon: "icon_videos", tip: "My record", itemType: UserCenterItemTypes.RECORD },
      { icon: "icon_ledger", tip: "Ledger", itemType: UserCenterItemTypes.LEDGER },
      { icon: "icon_setting", tip: "Settings", itemType: UserCenterItemTypes.SETTINGS },
      { icon: "icon_FAQs", tip: "FAQs", itemType: UserCenterItemTypes.FAQ, link: "https://www.dinomao.com/apps/help-center"  },
      { icon: "icon_contact", tip: "Contact us", itemType: UserCenterItemTypes.CONTACT },
      { icon: "icon_about us", tip: "About us", itemType: UserCenterItemTypes.ABOUT }
    ];
  }

  onUserDataChange(){
    if( this.scoreNumber != User.instance.score ) this.scoreNumber = User.instance.score;
    if( this.headIcon != User.instance.headIcon && User.instance.headIcon ) this.headIcon = User.instance.headIcon;
    if( this.isVip != User.instance.isVip ){
      this.isVip = User.instance.isVip;
      if( this.isVip ){
        let vipData: any = User.instance.vipData;
        let level: number = vipData.level;
        this.vipIcon = this.textureData.getTexture( "icon_vip" + level, 130, 140 );
      }
    }
    this.coinNumber = User.instance.coins;
  }
  
  gotoBank(): void{
    Trigger.gotoPage( WebPages.SHOP );
  }
}
