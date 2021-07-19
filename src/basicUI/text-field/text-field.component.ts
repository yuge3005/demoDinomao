/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-27 14:31:41
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-19 17:58:07
 */
import { Rectangle } from '../geom/rectangle';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit, OnChanges {

  @Input() positionRect!: Rectangle;
  @Input() align: string = "center";
  divStyle: string = "";
  spanStyle: string = "";
  
  @Input() text: string = "";
  
  @Input() color: number = 0;
  @Input() size: number = 10;
  @Input() font: string = "Arial";
  @Input() bold: boolean = false;

  currentSize: number = 10;

  @ViewChild('sp', {static: true}) sp!: ElementRef;

  sizeOrTextChanged: boolean = false;
  multiViewCheck: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.positionRect || changes.align ){
      this.updateDivStyle( this.positionRect, this.align );
    }
    if( changes.color || changes.font || changes.bold || changes.size ){
      if( changes.size ) this.textResize();
      this.updateSpanStyle();
    }
    if( changes.text ){
      this.textResize();
    }
  }

  textResize(){
    this.currentSize = this.size;
    this.sizeOrTextChanged = true;
  }

  protected updateDivStyle( rect: Rectangle, align: string ){
    if( !this.positionRect ) return;
    this.divStyle = `
      top: ${rect.y}px;
      left: ${rect.x}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      line-height: ${rect.height}px;
      text-align: ${align};
    `;
  }

  protected updateSpanStyle(){
    this.spanStyle = `
        font-family: ${this.font};
        font-weight: ${this.bold ? "bold" : "normal"};
        color: #${this.toString16(this.color)};
        font-size: ${this.currentSize}px;
      `
  }

  toString16( num: number ): string{
    let numStr: string = num.toString( 16 );
    let needAddZero: number = 6 - numStr.length;
    let addArr: string[] = ["","0","00","000","0000","00000"];
    return addArr[needAddZero] + numStr;
  }

  ngAfterViewChecked(){
    if( this.sp && this.sizeOrTextChanged ){
      if( this.multiViewCheck ) return;
      if( !this.positionRect ) return;
      if( this.positionRect.width < this.sp.nativeElement.offsetWidth ){
        setTimeout( this.zoomInText.bind(this), 10 );
        this.multiViewCheck = true;
      }
      else this.sizeOrTextChanged = false;
    }
  }

  zoomInText(){
    this.currentSize -= 3;
    this.updateSpanStyle();
    this.multiViewCheck = false;
  }
}
