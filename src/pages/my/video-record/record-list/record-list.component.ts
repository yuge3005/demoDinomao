/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 16:38:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-27 18:03:33
 */
import { Component } from '@angular/core';
import { ScrollListComponent } from '../../../../basicUI/basic-ui.module';
import { Trigger, WebPages } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent extends ScrollListComponent {

  minY(): number{
    return - this.listData.length * 201 + this.listHeight - 20;
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
    if( isClick ) {
      Trigger.gotoPage( WebPages.LOBBY, itemData );
    }
    return isClick;
  }
}
