/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 16:38:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 13:57:30
 */
import { Component } from '@angular/core';
import { ScrollList } from '../../../../basicUI/basic-ui.module';
import { Trigger } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent extends ScrollList {

  constructor() { 
    super();
  }
}
