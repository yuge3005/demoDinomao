/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 13:23:44
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-09 13:24:30
 */
import { Component } from '@angular/core';
import { ScrollList } from 'resize-able-ui';
import { Trigger } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends ScrollList {

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