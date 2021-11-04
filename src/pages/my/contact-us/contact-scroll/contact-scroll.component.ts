/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-04 16:02:21
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-04 16:08:31
 */
import { Component } from '@angular/core';
import { ScrollListComponent } from '../../../../basicUI/basic-ui.module';
import { Trigger } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-contact-scroll',
  templateUrl: './contact-scroll.component.html',
  styleUrls: ['./contact-scroll.component.css']
})
export class ContactScrollComponent extends ScrollListComponent {

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
