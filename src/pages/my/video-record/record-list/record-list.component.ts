/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 16:38:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-09 13:24:45
 */
import { Component } from '@angular/core';
import { ScrollList } from 'resize-able-ui';
import { Trigger } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent extends ScrollList {

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
}
