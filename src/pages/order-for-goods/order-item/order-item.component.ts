/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 13:34:33
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 14:23:11
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html'
})
export class OrderItemComponent extends ListItem {
  itemBg!: BitmapData;
  
  constructor() {
    super();
  }

  initUI(){
  }
}
