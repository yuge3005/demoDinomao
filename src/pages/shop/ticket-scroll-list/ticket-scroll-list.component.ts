/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-09 10:41:31
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-08 10:26:39
 */
import { Component } from '@angular/core';
import { ScrollListComponent } from '../../../basicUI/basic-ui.module';
import { Trigger } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-ticket-scroll-list',
  templateUrl: './ticket-scroll-list.component.html',
  styleUrls: ['./ticket-scroll-list.component.css']
})
export class TicketScrollListComponent extends ScrollListComponent {

  minY(): number{
    return - Math.ceil( this.listData.length / 2 ) * 550 + this.listHeight + ( this.listData.length & 1 ) * 60 - 60;
  }

  constructor() {
    super();
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    super.onWheel( event );
  }
}