import { ScrollInput } from '../scroll-input';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-05 11:55:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-05 11:57:07
 */
@Component({
  selector: 'app-scroll-text-area',
  templateUrl: './scroll-text-area.component.html',
  styleUrls: ['./scroll-text-area.component.css']
})
export class ScrollTextAreaComponent extends ScrollInput{

  constructor() {
      super();
      this.multiline = "multiline";
  }
}