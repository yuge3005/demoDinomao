/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-14 11:49:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 11:13:54
 */
import { Component } from '@angular/core';
import { Application, ScrollList } from '../../../../basicUI/basic-ui.module';
import { UserCenterItemTypes, Trigger, WebPages, UserAddress } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center-scroll-list',
  templateUrl: './user-center-scroll-list.component.html',
  styleUrls: ['./user-center-scroll-list.component.css']
})
export class UserCenterScrollListComponent extends ScrollList {

  minY(): number{
    return - this.listData.length * 146 + this.listHeight - 20;
  }

  constructor() { 
    super();
  }

  onItemClick( itemData: any ): boolean{
    let isClick: boolean = super.onItemClick( itemData );
    if( isClick ) this.excuteByType( itemData );
    return isClick;
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
