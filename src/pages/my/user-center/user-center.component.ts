/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-10 15:17:37
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 10:21:11
*/
import { Component } from '@angular/core';
import { Application, BitmapData, Rectangle, StyleX } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, Trigger, WebPages, User, TextData, UserCenterItemTypes, UserAddress } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html'
})
export class UserCenterComponent extends MainPage {

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
    this.ui.coinBg = this.textureData.getTexture( "bg", 500, 40 );
    this.ui.ticketBg = this.textureData.getTexture( "bg", 500, 120 );
    this.ui.coinIcon = this.textureData.getTexture( "icon_coin", 502, 43 );
    this.ui.ticketIcon = this.textureData.getTexture( "icon_ticket", 497, 125 );
    this.ui.plusBtn = this.textureData.getTexture( "btn_plus", 669, 43 );
    this.ui.headMask = this.textureData.getTexture( "lobby_04", 19, 39 );

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

    this.styles.facebookHead = StyleX.combine( StyleX.borderRadius(70), StyleX.setItemRect(20,40,140,140) );
    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.styles.scrollBar = StyleX.combine( StyleX.scrollBar(), StyleX.setItemPosition(15,185), StyleX.setSize(730,0,true,false) );
  }

  onUserDataChange(){
    if( this.scoreNumber != User.instance.score ) this.scoreNumber = User.instance.score;
    if( this.headIcon != User.instance.headIcon && User.instance.headIcon ) this.headIcon = User.instance.headIcon;
    if( this.isVip != User.instance.isVip ){
      this.isVip = User.instance.isVip;
      if( this.isVip ){
        let vipData: any = User.instance.vipData;
        let level: number = vipData.level;
        this.ui.vipIcon = this.textureData.getTexture( "icon_vip" + level, 130, 140 );
      }
    }
    this.coinNumber = User.instance.coins;
  }
  
  gotoBank(): void{
    Trigger.gotoPage( WebPages.SHOP );
  }

  onListItemClick( itemData: any ){
    this.excuteByType( itemData );
  }

  excuteByType( itemData: any ){
    switch( itemData.itemType ){
      case UserCenterItemTypes.VIP:
        Trigger.gotoPage( WebPages.SHOP, "vip" );
        break;
      case UserCenterItemTypes.ORDER:
        Trigger.gotoPage( WebPages.ORDER );
        break;
      case UserCenterItemTypes.SETTINGS:
        Trigger.gotoPage( WebPages.SETTINGS );
        break;
      case UserCenterItemTypes.CONTACT:
        Trigger.gotoPage( WebPages.CONTACT );
        break;
      case UserCenterItemTypes.FAQ:
        if( itemData.link.startsWith( "newtab:" ) ){
          if( Application.system.isIOS ) eval( "window.webkit.messageHandlers.outSidePage.postMessage(itemData.link)" );
          else document.location.href = itemData.link;
        }
        break;
      case UserCenterItemTypes.ABOUT:
        Trigger.gotoPage( WebPages.ABOUT_US );
        break;
      case UserCenterItemTypes.RECORD:
        Trigger.gotoPage( WebPages.VIDEO_RECORD );
        break;
      case UserCenterItemTypes.LEDGER:
        Trigger.gotoPage( WebPages.LEDGER );
        break;
      case UserCenterItemTypes.ADDRESS:
        UserAddress.fromPage = WebPages.USER_CENTER;
        Trigger.gotoPage( WebPages.ADDRESS );
        break;
      default:
        break;
    }
  }
}
