/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-29 14:43:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 16:14:50
 */
import { Component } from '@angular/core';
import { ResizeAble } from '../../basicUI/ui/ResizeAble';

@Component({
  selector: 'app-main-div',
  templateUrl: './main-div.component.html',
  styleUrls: ['./main-div.component.css']
})
export class MainDivComponent extends ResizeAble {

  constructor() {
    super();
  }
}
