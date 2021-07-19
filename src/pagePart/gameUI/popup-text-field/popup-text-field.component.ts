/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-19 12:00:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-19 16:35:11
*/
import { ElementRef, ViewChild } from '@angular/core';
import { Rectangle } from './../../../basicUI/geom/rectangle';
import { TextData } from './../../../service/gameData/TextData';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TextFieldComponent } from './../../../basicUI/text-field/text-field.component';

@Component({
  selector: 'app-popup-text-field',
  templateUrl: './popup-text-field.component.html',
  styleUrls: ['./popup-text-field.component.css']
})
export class PopupTextFieldComponent extends TextFieldComponent{

  @Input() textData!: TextData;
  @Input() text: string = "";

  txtRect: Rectangle = new Rectangle( 0, 0, 100, 20 );
  textAlign: string = "center";
  divStyle: string = "";
  spanStyle: string = "";
  
  textStr: string = "";

  color: number = 0;
  size: number = 10;
  fontStr: string = "Arial";
  stroke: number = 0;
  strokeColor: number = 0;
  
  sizeStr: string = "10px";
  fontBold: string = "normal";
  fontStroke: string = "";

  @ViewChild('sp', {static: true}) sp!: ElementRef;

  sizeOrTextChanged: boolean = false;
  multiViewCheck: boolean = false;

  constructor() { 
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.textData ){
      var rect: any = this.textData.rect;
      this.positionRect = new Rectangle( rect.x, rect.y, rect.w, rect.h );
      if( this.textData.align ) this.textAlign = this.textData.align;
      this.updateDivStyle( this.positionRect, this.textAlign );

      if( this.textData.size ) this.size = this.textData.size;
      if( this.textData.color ) this.color = this.textData.color;
      if( this.textData.font ) this.fontStr = this.textData.font;
      if( this.textData.stroke ){
        this.stroke = this.textData.stroke;
        this.strokeColor = this.textData.strokeColor;
      }

      this.spanStyle = `
        font-family: ${this.fontStr};
        font-weight: bold;
        color: #FFFFFF;
        font-size: 50px;
        stroke: fontStroke;
        text-stroke: 1px #f00;
        -webkit-text-stroke: 1px #f00;
      `
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
      if( this.txtRect.width < this.sp.nativeElement.offsetWidth ){
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
