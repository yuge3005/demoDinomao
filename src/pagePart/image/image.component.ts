import { BitmapData } from './../../service/bitmap-data';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnChanges {

  @Input() imgData!: BitmapData;
  imgStyle: string = "";
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( !this.imgData ) return;
    this.imgStyle = `
      background-image: url("${this.imgData.url}");
      width: ${this.imgData.w}px;
      height: ${this.imgData.h}px;
      background-position: -${this.imgData.x}px -${this.imgData.y}px;
      left: ${this.imgData.left + this.imgData.offX}px;
      top: ${this.imgData.top + this.imgData.offY}px;
    `
  }
}
