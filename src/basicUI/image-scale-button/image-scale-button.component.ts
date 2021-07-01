/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-29 14:45:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-01 11:20:35
 */
import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ImageButtonComponent } from '../image-button/image-button.component';
import { BitmapData } from '../image/bitmap-data';

@Component({
  selector: 'app-image-scale-button',
  templateUrl: './image-scale-button.component.html',
  styleUrls: ['./image-scale-button.component.css']
})
export class ImageScaleButtonComponent extends ImageButtonComponent {

  @Input() buttonIcon!: BitmapData;
  @Input() enabled: Boolean = true;
  iconStyle: string = '';

  @Output() touchDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchUp: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( this.imgData ) super.ngOnChanges( changes );
    if( this.imgData && this.buttonIcon ){
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
  }

  onDown( event: Event ){
    if( !this.enabled ) return;
    var btn: HTMLDivElement = event.currentTarget as HTMLDivElement;
    var icon = btn.children[0];
    icon.className = "imgIconZoomin";
    this.touchDown.emit();
  }

  onUp( event: Event ){
    var btn: HTMLDivElement = event.currentTarget as HTMLDivElement;
    var icon = btn.children[0];
    icon.className = "imgIcon";
    this.touchUp.emit();
  }
}
