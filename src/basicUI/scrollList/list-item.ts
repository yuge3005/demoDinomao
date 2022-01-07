/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-06 17:03:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 11:20:02
*/
import { Component, Input } from '@angular/core';
import { UIFromParent } from '../ui/UIFromParent';

@Component({
  template: ''
})
export class ListItem extends UIFromParent {

  @Input() itemData: any;
  @Input() index: number = 0;

  constructor() {
    super()
  }
}
