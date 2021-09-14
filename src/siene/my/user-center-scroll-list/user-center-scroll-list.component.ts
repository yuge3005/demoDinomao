/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-14 11:49:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-14 14:45:55
 */
import { Component } from '@angular/core';
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
    if( isClick ) this.excuteByType( itemData.itemType );
    return isClick;
  }

  excuteByType( itemType: string ){
    switch( itemType ){
      case UserCenterItemTypes.VIP:
        Trigger.openSubscription();
        break;
      case UserCenterItemTypes.ABOUT:
        Trigger.gotoPage( WebPages.ABOUT_US );
        break;
      default:
        break;
    }
  }
}
