/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-14 11:49:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-23 14:12:40
 */
import { Component } from '@angular/core';
import { Application } from '../../../basicUI/basic-ui.module';
import { ScrollListComponent, UserCenterItemTypes, Trigger, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center-scroll-list',
  templateUrl: './user-center-scroll-list.component.html',
  styleUrls: ['./user-center-scroll-list.component.css']
})
export class UserCenterScrollListComponent extends ScrollListComponent {

  minY(): number{
    return - 7 * 146 + this.listHeight - 20;
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
      case UserCenterItemTypes.SETTINGS:
        Trigger.gotoPage( WebPages.SETTINGS );
        break;
      case UserCenterItemTypes.CONTACT:
      case UserCenterItemTypes.FAQ:
        if( itemData.link.startsWith( "newtab:" ) ){
          if( Application.system.isIOS ) eval( "window.webkit.messageHandlers.outSidePage.postMessage(itemData.link)" );
          else document.location.href = itemData.link;
        }
        break;
      case UserCenterItemTypes.ABOUT:
        Trigger.gotoPage( WebPages.ABOUT_US );
        break;
      default:
        break;
    }
  }
}
