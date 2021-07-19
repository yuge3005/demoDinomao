/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-27 14:31:41
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-19 16:24:34
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
  
  @Input() text: string = "";
  @Input() color: number = 0;
  @Input() size: number = 10;
  @Input() font: string = "";
  @Input() bold: boolean = false;
  @Input() stroke: number = 0;
  @Input() strokeColor: number = 0;
  
  textStr: string = "";
  colorStr: string = "#000000";
  sizeStr: string = "10px";
  fontStr: string = "Arial";
  fontBold: string = "normal";
  fontStroke: string = "";

  @ViewChild('sp', {static: true}) sp!: ElementRef;

  sizeOrTextChanged: boolean = false;
  multiViewCheck: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.positionRect ){
      this.updateDivStyle( this.positionRect, this.align );
    }
    if( changes.text ){
      this.textStr = changes.text.currentValue;
      this.sizeStr = this.size + "px";
      this.sizeOrTextChanged = true;
    }
    if( changes.color ){
      this.colorStr = "#" + this.toString16( this.color );
    }
    if( changes.size ){
      this.sizeStr = this.size + "px";
      this.sizeOrTextChanged = true;
    }
    if( changes.font ){
      this.fontStr = this.font;
    }
    if( changes.bold ){
      this.fontBold = this.bold ? "bold" : "normal";
    }
    if( changes.align ){
      this.updateDivStyle( this.positionRect, this.align );
    }
    if( changes.stroke || changes.strokeColor ){
      this.fontStroke = this.stroke ?  this.stroke + "px #" + this.toString16( this.strokeColor ) : "";
    }
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
    let currentSize: number = parseInt( this.sizeStr.replace( /\D/g, "" ) );
    this.sizeStr = currentSize - 3 + "px";
    this.multiViewCheck = false;
  }
}
