/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-27 10:06:05
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-21 16:17:36
*/

export { Application } from './settings/Application';
export { StageScaleMode } from './settings/StageScaleMode';
export { StageOrientationMode } from './settings/StageOrientationMode';
export { SimplePoint } from './geom/SimplePoint';
export { SimpleRect } from './geom/SimpleRect';
export { Point } from './geom/point';
export { Rectangle } from './geom/rectangle';
export { BitmapData } from './img/bitmap-data';
export { SoundManager } from './sound/SoundManager';
export { SimpleMovieClip } from './mc/simple-movie-clip/SimpleMovieClip';
export { MovieClipDataFactory } from './mc/movie-clip/MovieClipDataFactory';
export { MovieClip } from './mc/movie-clip/MovieClip';
export { Ease } from './tween/Ease';
export { Tween } from './tween/Tween';
export { HttpRequest } from './net/http-request';
export { KeyValue } from './tools/KeyValue';
export { BlendMode } from './tools/BlendMode';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export { UIFromParent } from './ui/UIFromParent';
export { ResizeAble } from './ui/ResizeAble';
export { UIComponent } from './ui/UIComponent';

export { ListItem } from './scrollList/list-item';
export { ScrollList } from './scrollList/scroll-list';
export { ScrollInput } from './scrollList/scroll-input';
export { DragEntity } from './touchDragBar/DragEntity';

import { ImageComponent } from './img/image/image.component';
import { ImageButtonComponent } from './img/image-button/image-button.component';
import { ImageScaleButtonComponent } from './img/image-scale-button/image-scale-button.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { SimpleMovieClipComponent } from './mc/simple-movie-clip/simple-movie-clip.component';
import { MovieClipComponent } from './mc/movie-clip/movie-clip.component';
import { ActiveIndexPointComponent } from './active-index-point/active-index-point.component';
import { ScrollListButtonComponent } from './scrollList/scroll-list-button/scroll-list-button.component';
import { ScrollTextInputComponent } from './scrollList/scroll-text-input/scroll-text-input.component';
import { ScrollTextAreaComponent } from './scrollList/scroll-text-area/scroll-text-area.component';
import { TouchDragBarComponent } from './touchDragBar/touchDragBar.component';

export { ImageComponent } from './img/image/image.component';
export { ImageButtonComponent } from './img/image-button/image-button.component';
export { ImageScaleButtonComponent } from './img/image-scale-button/image-scale-button.component';
export { TextFieldComponent } from './text-field/text-field.component';
export { SimpleMovieClipComponent } from './mc/simple-movie-clip/simple-movie-clip.component';
export { MovieClipComponent } from './mc/movie-clip/movie-clip.component';
export { ScrollListButtonComponent } from './scrollList/scroll-list-button/scroll-list-button.component';

export { ActiveIndexPointComponent } from './active-index-point/active-index-point.component';
export { ScrollTextInputComponent } from './scrollList/scroll-text-input/scroll-text-input.component';
export { ScrollTextAreaComponent } from './scrollList/scroll-text-area/scroll-text-area.component';
export { TouchDragBarComponent } from './touchDragBar/touchDragBar.component';

@NgModule({
  declarations: [
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    TextFieldComponent,
    SimpleMovieClipComponent,
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
    SimpleMovieClipComponent,
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
