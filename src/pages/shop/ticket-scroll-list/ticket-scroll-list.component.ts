/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-09 10:41:31
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 13:58:13
 */
import { Component } from '@angular/core';
import { ScrollList } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-ticket-scroll-list',
  templateUrl: './ticket-scroll-list.component.html',
  styleUrls: ['./ticket-scroll-list.component.css']
})
export class TicketScrollListComponent extends ScrollList {
  constructor() {
    super();
  }
}
