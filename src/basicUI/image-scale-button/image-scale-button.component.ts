import { Tween } from '../tween/Tween';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-29 14:45:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 15:32:34
 */
import { Component, Input, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ImageButtonComponent } from '../image-button/image-button.component';
import { BitmapData } from '../image/bitmap-data';

@Component({
  selector: 'app-image-scale-button',
  templateUrl: './image-scale-button.component.html',
  styleUrls: ['./image-scale-button.component.css']
})
export class ImageScaleButtonComponent extends ImageButtonComponent implements OnDestroy {

  @Input() buttonIcon!: BitmapData;
  @Input() enabled: Boolean = true;
  @Input() smooth: Boolean = true;
  iconStyle: string = '';

  @Output() touchDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchUp: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('carousel', {static: true}) carousel!: ElementRef;

  private _scale: number = 1;
  set scale( value: number ){
    this._scale = value;
    if( this.carousel ) this.carousel.nativeElement.style.transform ='scale(' + value + ')';
  }
  get scale(): number{
    return this._scale;
  }

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

  onDown( event: Event ){
    if( !this.enabled ) return;
    if( this.smooth ){
      Tween.kill( this );
      Tween.to( this, 0.16, { scale: 0.9 } )
    }
    else this.scale = 0.9;
    this.touchDown.emit();
  }

  onUp( event: Event ){
    if( this.smooth ){
      Tween.kill( this );
      Tween.to( this, 0.16, { scale: 1 } )
    }
    else this.scale = 1;
    this.touchUp.emit();
  }

  ngOnDestroy(){
    Tween.kill( this );
  }
}
