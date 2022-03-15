export { Application } from './settings/Application';
export { StageScaleMode } from './settings/StageScaleMode';
export { StageOrientationMode } from './settings/StageOrientationMode';
export { Point } from './geom/point';
export { Rectangle } from './geom/rectangle';
export { Vector3D } from './geom/vector3D';
export { BitmapData } from './img/bitmap-data';
export { maskStyle } from './img/mask-img/maskStyle';
export { SoundManager } from './sound/SoundManager';
export { SimpleMovieClip } from './mc/simple-movie-clip/SimpleMovieClip';
export { MovieClipDataFactory } from './mc/movie-clip/MovieClipDataFactory';
export { MovieClip } from './mc/movie-clip/MovieClip';
export { Ease } from './tween/Ease';
export { Tween } from './tween/Tween';
export { HttpRequest } from './net/http-request';
export { BlendMode } from './tools/BlendMode';
export { Filters } from './tools/Filters';
export { KeyValue } from './tools/KeyValue';
export { StringTransform } from './tools/StringTransform';
export { StyleX } from './tools/StyleX';
export { Transform3D } from './tools/Transform3D';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export { UIFromParent } from './ui/UIFromParent';
export { ResizeAble } from './ui/ResizeAble';
export { UIComponent } from './ui/UIComponent';

export { ListItem } from './ui/listItem';
export { TextInput } from './text/text-input/text-input';
export { DragEntity } from './touchDragBar/DragEntity';

import { ImageComponent } from './img/image/image.component';
import { ImageButtonComponent } from './img/image-button/image-button.component';
import { ImageScaleButtonComponent } from './img/image-scale-button/image-scale-button.component';
import { MaskImgComponent } from './img/mask-img/mask-img.component';
import { TextFieldComponent } from './text/text-field/text-field.component';
import { TextShadowStrokeComponent } from './text/text-shadow-stroke/text-shadow-stroke.component';
import { SimpleMovieClipComponent } from './mc/simple-movie-clip/simple-movie-clip.component';
import { MovieClipComponent } from './mc/movie-clip/movie-clip.component';
import { ActiveIndexPointComponent } from './active-index-point/active-index-point.component';
import { TextInputComponent } from './text/text-input/text-input/text-input.component';
import { TextAreaComponent } from './text/text-input/text-area/text-area.component';
import { TouchDragBarComponent } from './touchDragBar/touchDragBar.component';

export { ImageComponent } from './img/image/image.component';
export { ImageButtonComponent } from './img/image-button/image-button.component';
export { ImageScaleButtonComponent } from './img/image-scale-button/image-scale-button.component';
export { MaskImgComponent } from './img/mask-img/mask-img.component';
export { TextFieldComponent } from './text/text-field/text-field.component';
export { TextShadowStrokeComponent } from './text/text-shadow-stroke/text-shadow-stroke.component';
export { SimpleMovieClipComponent } from './mc/simple-movie-clip/simple-movie-clip.component';
export { MovieClipComponent } from './mc/movie-clip/movie-clip.component';

export { ActiveIndexPointComponent } from './active-index-point/active-index-point.component';
export { TextInputComponent } from './text/text-input/text-input/text-input.component';
export { TextAreaComponent } from './text/text-input/text-area/text-area.component';
export { TouchDragBarComponent } from './touchDragBar/touchDragBar.component';

/**
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-30 09:50:59
 * @description: This library provides a series of UI solutions: including different screen rotation modes and screen adaptation under various resolutions; Provide animation playback solutions; Provide the packaging optimization scheme of page materials; Sound playback; And some practical tools.
 * @ 本库提供一系列的UI解决方案：包括不同屏幕旋转模式，各种分辨率下的屏幕自适应；提供动画播放解决方案；提供页面素材的打包优化方案；声音播放；以及一些实用工具。
 * @api: app-active-index-point,app-image,app-image-button,app-image-scale-button,app-movie-clip,app-simple-movie-clip,app-touchDragBar
 * @ ResizeAble,UIComponent,UIFromParant,Point,Rectangle,Application,SoundManager,HttpRequest,DragEntity,Tween
 */
@NgModule({
  declarations: [
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    MaskImgComponent,
    TextFieldComponent,
    TextShadowStrokeComponent,
    SimpleMovieClipComponent,
    MovieClipComponent,
    ActiveIndexPointComponent,
    TextInputComponent,
    TextAreaComponent,
    TouchDragBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImageComponent,
    ImageButtonComponent,
    ImageScaleButtonComponent,
    MaskImgComponent,
    TextFieldComponent,
    TextShadowStrokeComponent,
    SimpleMovieClipComponent,
    MovieClipComponent,
    ActiveIndexPointComponent,
    TextInputComponent,
    TextAreaComponent,
    TouchDragBarComponent
  ],
  providers: []
})
export class BasicUiModule { }
