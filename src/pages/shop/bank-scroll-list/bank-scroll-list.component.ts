/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-07 09:59:49
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 13:40:21
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

  minY(): number{
    return - 6 * 185 + this.listHeight;
  }

  constructor() { 
    super();
  }

  onListItemClick( itemData: any ){
    Trigger.modalCommand( ModalCommands.BUY_BANK, itemData );
  }
}
