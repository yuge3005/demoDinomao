/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-07 09:59:49
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-07 10:34:45
 */
import { Component } from '@angular/core';
import { ScrollListComponent, Trigger, ModalCommands } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-bank-scroll-list',
  templateUrl: './bank-scroll-list.component.html',
  styleUrls: ['./bank-scroll-list.component.css']
})
export class BankScrollListComponent extends ScrollListComponent {

  minY(): number{
    return - 6 * 185 + this.listHeight;
  }

  constructor() { 
    super();
  }

  onItemClick( itemData: any ){
    super.onItemClick( itemData );
    Trigger.modalCommand( ModalCommands.BUY_BANK, itemData );
  }
}
