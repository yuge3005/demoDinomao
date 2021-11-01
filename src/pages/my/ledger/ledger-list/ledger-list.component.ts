/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 10:50:01
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-01 10:54:57
 */
import { Component } from '@angular/core';
import { ScrollListComponent } from '../../../../basicUI/basic-ui.module';
import { Trigger } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.css']
})
export class LedgerListComponent extends ScrollListComponent {

  minY(): number{
    return - this.listData.length * 138 + this.listHeight - 20;
  }

  constructor() {
    super();
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    super.onWheel( event );
  }
}
