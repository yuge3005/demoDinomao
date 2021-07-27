/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-27 10:06:05
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-27 11:04:03
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIFromParent } from './ui/UIFromParent';
export { UIFromParent } from './ui/UIFromParent';
import { ResizeAble } from './ui/ResizeAble';
export { ResizeAble } from './ui/ResizeAble';
import { UIComponent } from './ui/UIComponent';
export { UIComponent } from './ui/UIComponent';

@NgModule({
  declarations: [ 
    ResizeAble,
    UIComponent,
    UIFromParent
  ],
  imports: [
    CommonModule
  ],
  exports:[ 
    ResizeAble,
    UIComponent,
    UIFromParent
  ]
})
export class BasicUiModule { }
