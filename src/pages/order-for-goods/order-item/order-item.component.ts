/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 13:34:33
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:28:31
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent extends ListItem {
  itemBg!: BitmapData;
  
  constructor() {
    super();
  }

  initUI(){
  }
}
