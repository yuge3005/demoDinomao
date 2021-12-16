/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-27 10:06:05
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 10:56:48
*/

export { Application } from './settings/Application';
export { StageScaleMode } from './settings/StageScaleMode';
export { StageOrientationMode } from './settings/StageOrientationMode';
export { SimplePoint } from './geom/SimplePoint';
export { SimpleRect } from './geom/SimpleRect';
export { Point } from './geom/point';
export { Rectangle } from './geom/rectangle';
export { BitmapData } from './image/bitmap-data';
export { SoundManager } from './sound/SoundManager';
export { SimpleMovieClip } from './simple-movie-clip/SimpleMovieClip';
export { MovieClipDataFactory } from './egret-mc/MovieClipDataFactory';
export { EgretMc } from './egret-mc/EgretMc';
export { Ease } from './tween/Ease';
export { Tween } from './tween/Tween';
export { HttpRequest } from './net/http-request';
export { KeyValue } from './tools/KeyValue';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export { UIFromParent } from './ui/UIFromParent';
export { ResizeAble } from './ui/ResizeAble';
export { UIComponent } from './ui/UIComponent';

export { ListItem } from './scrollList/list-item';
export { ScrollList } from './scrollList/scroll-list';
export { ScrollInput } from './scrollList/scroll-input';
export { DragEntity } from './touchDragBar/DragEntity';

import { ImageComponent } from './image/image.component';
import { ImageButtonComponent } from './image-button/image-button.component';
import { ImageScaleButtonComponent } from './image-scale-button/image-scale-button.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { SimpleMovieClipComponent } from './simple-movie-clip/simple-movie-clip.component';
import { EgretMcComponent } from './egret-mc/egret-mc.component';
import { ActiveIndexPointComponent } from './active-index-point/active-index-point.component';
import { ScrollListButtonComponent } from './scrollList/scroll-list-button/scroll-list-button.component';
import { ScrollTextInputComponent } from './scrollList/scroll-text-input/scroll-text-input.component';
import { ScrollTextAreaComponent } from './scrollList/scroll-text-area/scroll-text-area.component';
import { TouchDragBarComponent } from './touchDragBar/touchDragBar.component';

export { ImageComponent } from './image/image.component';
export { ImageButtonComponent } from './image-button/image-button.component';
export { ImageScaleButtonComponent } from './image-scale-button/image-scale-button.component';
export { TextFieldComponent } from './text-field/text-field.component';
export { SimpleMovieClipComponent } from './simple-movie-clip/simple-movie-clip.component';
export { EgretMcComponent } from './egret-mc/egret-mc.component';
export { ScrollListButtonComponent } from './scrollList/scroll-list-button/scroll-list-button.component';

@NgModule({
  declarations: [
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    TextFieldComponent,
    SimpleMovieClipComponent,
    EgretMcComponent,
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
    SimpleMovieClipComponent,
    EgretMcComponent,
    ActiveIndexPointComponent,
    ScrollListButtonComponent,
    ScrollTextInputComponent,
    ScrollTextAreaComponent,
    TouchDragBarComponent
  ],
  providers: []
})
export class BasicUiModule { }
