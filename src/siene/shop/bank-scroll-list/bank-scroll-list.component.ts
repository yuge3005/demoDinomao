/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-07 09:59:49
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-07 11:30:25
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

  onItemClick( itemData: any ): boolean{
    let isClick: boolean = super.onItemClick( itemData );
    if( isClick )Trigger.modalCommand( ModalCommands.BUY_BANK, itemData );
    return isClick
  }
}