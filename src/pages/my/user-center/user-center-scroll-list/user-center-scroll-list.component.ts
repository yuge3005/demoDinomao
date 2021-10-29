/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-14 11:49:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-29 13:19:07
 */
import { Component } from '@angular/core';
import { Application, ScrollListComponent } from '../../../../basicUI/basic-ui.module';
import { UserCenterItemTypes, Trigger, WebPages } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center-scroll-list',
  templateUrl: './user-center-scroll-list.component.html',
  styleUrls: ['./user-center-scroll-list.component.css']
})
export class UserCenterScrollListComponent extends ScrollListComponent {

  minY(): number{
    return - this.listData.length * 146 + this.listHeight - 20;
  }

  constructor() { 
    super();
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    super.onWheel( event );
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
      default:
        break;
    }
  }
}
