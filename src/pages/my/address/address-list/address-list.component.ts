/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:12:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:24:05
 */
  import { Component } from '@angular/core';
  import { ScrollList } from '../../../../basicUI/basic-ui.module';
  import { Trigger } from '../../../../service/dinomao-game.module';
  
  @Component({
    selector: 'app-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.css']
  })
  export class AddressListComponent extends ScrollList {
  
    minY(): number{
      return - this.listData.length * 310 + this.listHeight - 30;
    }
  
    constructor() {
      super();
    }
  
    onWheel( event: WheelEvent ){
      if( Trigger.hasPopup ) return;
      super.onWheel( event );
    }
  }
  