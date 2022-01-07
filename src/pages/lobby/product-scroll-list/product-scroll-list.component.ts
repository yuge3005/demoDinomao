/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-07 10:44:16
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 13:56:31
*/
import { Component, Input } from '@angular/core';
import { Point, ScrollList } from '../../../basicUI/basic-ui.module';
import { Trigger, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-product-scroll-list',
  templateUrl: './product-scroll-list.component.html',
  styleUrls: ['./product-scroll-list.component.css']
})
export class ProductScrollListComponent extends ScrollList {

  @Input()pageSize: number = 0;

  constructor() {
    super();
  }

  onListItemClick( itemData: any ){
    Trigger.gotoPage( WebPages.VIDEO, itemData );
  }
}
