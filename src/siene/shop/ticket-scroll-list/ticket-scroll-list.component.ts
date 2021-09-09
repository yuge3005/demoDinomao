/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-09 10:41:31
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-09 11:12:31
 */
import { Component } from '@angular/core';
import { ScrollListComponent } from 'src/service/dinomao-game.module';

@Component({
  selector: 'app-ticket-scroll-list',
  templateUrl: './ticket-scroll-list.component.html',
  styleUrls: ['./ticket-scroll-list.component.css']
})
export class TicketScrollListComponent extends ScrollListComponent {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
