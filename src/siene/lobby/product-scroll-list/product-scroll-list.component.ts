/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-07 10:44:16
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-07 13:32:30
 */
import { Component, Input } from '@angular/core';
import { ScrollListComponent, Trigger, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-product-scroll-list',
  templateUrl: './product-scroll-list.component.html',
  styleUrls: ['./product-scroll-list.component.css']
})
export class ProductScrollListComponent extends ScrollListComponent {

  @Input()pageSize: number = 0;

  minY(): number{
    return - Math.ceil( Math.min( this.listData.length, this.pageSize ) / 2 ) * 425 + this.listHeight - 30;
  }

  constructor() {
    super();
  }

  onItemClick( itemData: any ): boolean{
    let isClick: boolean = super.onItemClick( itemData );
    if( isClick ) Trigger.gotoPage( WebPages.VIDEO, itemData );
    return isClick;
  }
}
