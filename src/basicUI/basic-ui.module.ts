/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-27 10:06:05
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-27 12:02:01
*/
import { Application } from './settings/Application';
export { Application } from './settings/Application';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIFromParent } from './ui/UIFromParent';
export { UIFromParent } from './ui/UIFromParent';
import { ResizeAble } from './ui/ResizeAble';
export { ResizeAble } from './ui/ResizeAble';
import { UIComponent } from './ui/UIComponent';
export { UIComponent } from './ui/UIComponent';
import { ImageComponent } from './image/image.component';
export { ImageComponent } from './image/image.component';
import { ImageButtonComponent } from './image-button/image-button.component';
export { ImageButtonComponent } from './image-button/image-button.component';
import { ImageScaleButtonComponent } from './image-scale-button/image-scale-button.component';
export { ImageScaleButtonComponent } from './image-scale-button/image-scale-button.component';
import { TextFieldComponent } from './text-field/text-field.component';
export { TextFieldComponent } from './text-field/text-field.component';

@NgModule({
  declarations: [ 
    ResizeAble,
    UIComponent,
    UIFromParent,
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    TextFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ 
    ResizeAble,
    UIComponent,
    UIFromParent,
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    TextFieldComponent
  ],
  providers: [Application]
})
export class BasicUiModule { }
