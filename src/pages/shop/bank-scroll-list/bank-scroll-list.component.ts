/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-07 09:59:49
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 13:57:55
 */
import { Component } from '@angular/core';
import { ScrollList } from '../../../basicUI/basic-ui.module';
import { Trigger, ModalCommands } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-bank-scroll-list',
  templateUrl: './bank-scroll-list.component.html',
  styleUrls: ['./bank-scroll-list.component.css']
})
export class BankScrollListComponent extends ScrollList {
  constructor() { 
    super();
  }

  onListItemClick( itemData: any ){
    Trigger.modalCommand( ModalCommands.BUY_BANK, itemData );
  }
}
