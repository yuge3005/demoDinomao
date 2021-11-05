/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-27 10:06:05
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-05 11:59:10
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
export { Ease } from './tween/Ease';
export { Tween } from './tween/Tween';
export { HttpRequest } from './net/http-request';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { UIFromParent } from './ui/UIFromParent';
export { ResizeAble } from './ui/ResizeAble';
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
import { ScrollListButtonComponent } from './scrollList/scroll-list-button/scroll-list-button.component';
export { ScrollListButtonComponent } from './scrollList/scroll-list-button/scroll-list-button.component';
import { ScrollTextInputComponent } from './scrollList/scroll-text-input/scroll-text-input.component';
export { ScrollTextInputComponent } from './scrollList/scroll-text-input/scroll-text-input.component';
import { ScrollTextAreaComponent } from './scrollList/scroll-text-area/scroll-text-area.component';
export { ScrollTextAreaComponent } from './scrollList/scroll-text-area/scroll-text-area.component';
export { ListItemComponent } from './scrollList/list-item.component';
export { ScrollListComponent } from './scrollList/scroll-list.component';
import { TouchDragBarComponent } from './touchDragBar/touchDragBar.component';
export { TouchDragBarComponent } from './touchDragBar/touchDragBar.component';

@NgModule({
  declarations: [
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    TextFieldComponent,
    MovieClipComponent,
    ActiveIndexPointComponent,
    ScrollListButtonComponent,
    ScrollTextInputComponent,
    ScrollTextAreaComponent,
    TouchDragBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    TextFieldComponent,
    MovieClipComponent,
    ActiveIndexPointComponent,
    ScrollListButtonComponent,
    ScrollTextInputComponent,
    ScrollTextAreaComponent,
    TouchDragBarComponent
  ],
  providers: []
})
export class BasicUiModule { }
