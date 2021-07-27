/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-27 10:06:05
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-27 14:56:35
*/
import { Application } from './settings/Application';
export { Application } from './settings/Application';
import { StageScaleMode } from './settings/StageScaleMode';
export { StageScaleMode } from './settings/StageScaleMode';
import { StageOrientationMode } from './settings/StageOrientationMode';
export { StageOrientationMode } from './settings/StageOrientationMode';
import { System } from './settings/System';
export { System } from './settings/System';
import { GlobalSettings } from './settings/GlobalSettings';
export { GlobalSettings } from './settings/GlobalSettings';
import { TextureData } from './image/texture-data';
import { Point } from './geom/point';
export { Point } from './geom/point';
import { Rectangle } from './geom/rectangle';
export { Rectangle } from './geom/rectangle';
import { BitmapData } from './image/bitmap-data';
export { BitmapData } from './image/bitmap-data';

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
  providers: [Application,StageScaleMode,StageOrientationMode,GlobalSettings,System,TextureData,Point,Rectangle,BitmapData]
})
export class BasicUiModule { }
