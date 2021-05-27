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
      width: ${this.imgData.sourceW}px;
      height: ${this.imgData.sourceH}px;
      background-position: -${this.imgData.x}px -${this.imgData.y}px;
      top: ${this.imgData.top}px;
      left: ${this.imgData.left}px;
    `
  }
}
