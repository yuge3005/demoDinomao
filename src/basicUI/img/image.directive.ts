import { Directive, Input, OnChanges } from '@angular/core';
import { BitmapData } from './bitmap-data';

@Directive({
  selector: '[appImage]',
  host: {
    '[attr.style]': 'imgStyle'
  }
})
export class ImageDirective implements OnChanges{

  @Input() appImage!: BitmapData;
  imgStyle: string = "";

  constructor() { }

  ngOnChanges(): void {
    if( !this.appImage ) return;
    this.imgStyle = `
      position: absolute;
      background-image: url("${this.appImage.url}");
      width: ${this.appImage.w}px;
      height: ${this.appImage.h}px;
      background-position: -${this.appImage.x}px -${this.appImage.y}px;
      left: ${this.appImage.left + this.appImage.offX}px;
      top: ${this.appImage.top + this.appImage.offY}px;
    `
  }
}
