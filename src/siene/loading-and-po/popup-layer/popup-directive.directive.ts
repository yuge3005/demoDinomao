/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 13:46:53
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 13:55:47
 */
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[popupContainer]'
})
export class PopupDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
