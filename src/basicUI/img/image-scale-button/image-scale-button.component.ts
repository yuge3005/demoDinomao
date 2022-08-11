/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-29 14:45:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 15:32:34
 */
import { Component, Input, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BitmapData } from '../bitmap-data';
import { Point } from 'src/basicUI/geom/point';
import { ImageComponent } from '../image/image.component';
import { SoundManager } from 'src/basicUI/sound/SoundManager';

@Component({
  selector: 'app-image-scale-button',
  templateUrl: './image-scale-button.component.html',
  styleUrls: ['./image-scale-button.component.css']
})
export class ImageScaleButtonComponent extends ImageComponent implements OnDestroy {

  @Input() buttonIcon!: BitmapData;
  @Input() enabled: Boolean = true;
  @Input() smooth: Boolean = true;
  iconStyle: string = '';

  @Output() itemClick: EventEmitter<Point> = new EventEmitter<Point>();
  @Input() soundUrl: string = "";

  @Output() touchDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchUp: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.imgData ){
      if( this.buttonIcon ){
        super.ngOnChanges( changes );
        this.iconStyle = `
          background-image: url("${this.buttonIcon.url}");
          width: ${this.buttonIcon.w}px;
          height: ${this.buttonIcon.h}px;
          background-position: -${this.buttonIcon.x}px -${this.buttonIcon.y}px;
          left: ${this.imgData.w * 0.5 + this.buttonIcon.left}px;
          top: ${this.imgData.h * 0.5 + this.buttonIcon.top}px;
          margin-left: ${-this.buttonIcon.w * 0.5}px;
          margin-top: ${-this.buttonIcon.h * 0.5}px;
        `
      }
      else {
        this.imgStyle = `
          width: ${this.imgData.w}px;
          height: ${this.imgData.h}px;
          left: ${this.imgData.left + this.imgData.offX}px;
          top: ${this.imgData.top + this.imgData.offY}px;
        `
        this.iconStyle = `
          background-image: url("${this.imgData.url}");
          width: ${this.imgData.w}px;
          height: ${this.imgData.h}px;
          background-position: -${this.imgData.x}px -${this.imgData.y}px;
          left: ${this.imgData.w * 0.5}px;
          top: ${this.imgData.h * 0.5}px;
          margin-left: ${-this.imgData.w * 0.5}px;
          margin-top: ${-this.imgData.h * 0.5}px;
        `
      }
    }
  }

  onDown(){
    this.touchDown.emit();
  }

  onUp(){
    this.touchUp.emit();
  }

  ngOnDestroy(){
  }

  onButtonClick( event: any ){
    let pt: Point = new Point().init( event.offsetX, event.offsetY );
    this.itemClick.emit( pt );

    if( this.soundUrl ) SoundManager.play( this.soundUrl );
    else if( SoundManager.defaltButtonSound ) SoundManager.play( SoundManager.defaltButtonSound );
  }
}
