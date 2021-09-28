/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-27 10:06:05
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-09-28 13:06:41
*/

export { Application } from './settings/Application';
export { StageScaleMode } from './settings/StageScaleMode';
export { StageOrientationMode } from './settings/StageOrientationMode';
export { SimplePoint } from './geom/SimplePoint';
export { Point } from './geom/point';
export { Rectangle } from './geom/rectangle';
export { BitmapData } from './image/bitmap-data';
export { SoundManager } from './sound/SoundManager';
export { MovieClip } from './movie-clip/MovieClip';

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
import { MovieClipComponent } from './movie-clip/movie-clip.component';
export { MovieClipComponent } from './movie-clip/movie-clip.component';
import { ActiveIndexPointComponent } from './active-index-point/active-index-point.component';
export { ActiveIndexPointComponent } from './active-index-point/active-index-point.component';

@NgModule({
  declarations: [
    ResizeAble,
    UIComponent,
    UIFromParent,
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    TextFieldComponent,
    MovieClipComponent,
    ActiveIndexPointComponent
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
    TextFieldComponent,
    MovieClipComponent,
    ActiveIndexPointComponent
  ],
  providers: []
})
export class BasicUiModule { }
