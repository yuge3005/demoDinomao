/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-10 10:38:44
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 13:12:37
 */
import { Component } from '@angular/core';
import { ScrollList } from 'resize-able-ui';
import { Trigger } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-prize-list',
  templateUrl: './prize-list.component.html',
  styleUrls: ['./prize-list.component.css']
})
export class PrizeListComponent extends ScrollList {

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

  onItemDelete( data: any ){
    let index: number = this.listData.indexOf( data );
    this.listData.splice( index, 1 );
  }
}