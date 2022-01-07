/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 10:50:01
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 13:57:07
 */
import { Component } from '@angular/core';
import { ScrollList } from '../../../../basicUI/basic-ui.module';
import { Trigger } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.css']
})
export class LedgerListComponent extends ScrollList {
  constructor() {
    super();
  }
}
