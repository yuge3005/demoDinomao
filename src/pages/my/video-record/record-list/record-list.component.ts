/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 16:38:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-27 16:43:54
 */
import { Component } from '@angular/core';
import { Application, ScrollListComponent } from '../../../../basicUI/basic-ui.module';
import { UserCenterItemTypes, Trigger, WebPages } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent extends ScrollListComponent {

  minY(): number{
    return - 7 * 146 + this.listHeight - 20;
  }

  constructor() { 
    super();
  }

}
