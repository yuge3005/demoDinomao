/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-14 11:49:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-14 11:57:33
 */
import { Component } from '@angular/core';
import { ScrollListComponent } from 'src/service/dinomao-game.module';

@Component({
  selector: 'app-user-center-scroll-list',
  templateUrl: './user-center-scroll-list.component.html',
  styleUrls: ['./user-center-scroll-list.component.css']
})
export class UserCenterScrollListComponent extends ScrollListComponent {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
