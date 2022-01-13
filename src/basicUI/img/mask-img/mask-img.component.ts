/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2022-01-12 15:01:42
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-13 10:25:58
*/
import { Component, Input, SimpleChanges } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { BitmapData } from '../bitmap-data';
import { StyleX } from '../../tools/StyleX';

@Component({
  selector: 'app-mask-img',
  templateUrl: './mask-img.component.html',
  styleUrls: ['./mask-img.component.css']
})
export class MaskImgComponent extends ImageComponent {

  @Input() src!: BitmapData | string;
  @Input() ngStyle: Object = {};
  srcIsString!: boolean;
  maskStyle: string = '';
  imgInnerStyle: Object = {};

  srcUrl: string = '';
  srcBitmapData!: BitmapData;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.imgData && this.imgData ){
      this.imgStyle = `
        width: ${this.imgData.w}px;
        height: ${this.imgData.h}px;
        left: ${this.imgData.left + this.imgData.offX}px;
        top: ${this.imgData.top + this.imgData.offY}px;
      `
    }
    if( changes.src && this.src ){
      if( typeof this.src == 'string' ){
        this.srcIsString = true;
        this.srcUrl = this.src;
      }
      else{
        this.srcIsString = false;
        this.srcBitmapData = this.src;
        this.imgInnerStyle = StyleX.setItemPosition( -this.srcBitmapData.x, -this.srcBitmapData.y );
      }
    }

    if( this.src && this.imgData ){
      let url: string = 'url(' + this.imgData.url + ')';
      if( typeof this.src == 'string' ){
        let position: string = `-${this.imgData.x}px -${this.imgData.y}px`;
        this.maskStyle = `
          mask-image: ${url};
          -webkit-mask-image: ${url};
          -webkit-mask-position: ${position};
          mask-position: ${position};
        `;
      }
      else{
        let position: string = `-${this.imgData.x-this.srcBitmapData.x}px -${this.imgData.y-this.srcBitmapData.y}px`;
        this.maskStyle = `
          mask-image: ${url};
          -webkit-mask-image: ${url};
          -webkit-mask-position: ${position};
          mask-position: ${position};
        `;
      }
    }
  }
}