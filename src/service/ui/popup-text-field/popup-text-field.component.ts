/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-19 12:00:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 16:55:24
*/
import { TextData } from '../../gameData/dataTypes';
import { Component, Input, SimpleChanges } from '@angular/core';
import { TextShadowStrokeComponent, Rectangle, StyleX } from 'resize-able-ui';

@Component({
  selector: 'app-popup-text-field',
  templateUrl: './popup-text-field.component.html',
  styleUrls: ['./popup-text-field.component.css']
})
export class PopupTextFieldComponent extends TextShadowStrokeComponent{

  @Input() textData!: TextData;

  stroke: number = 0;
  strokeStyle: Object = {};
  strokeColor: number = 0;
  
  sizeStr: string = "10px";
  fontBold: string = "normal";
  fontStroke: string = "";

  constructor() { 
    super();
    this.bold = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.textData?.currentValue ){
      var rect: any = this.textData.rect;
      this.positionRect = new Rectangle().init( rect.x, rect.y, rect.w, rect.h );
      if( this.textData.align ) this.align = this.textData.align;
      this.updateDivStyle( this.positionRect, this.align );

      if( this.textData.size ){
        this.size = this.textData.size;
        this.textResize();
      }
      if( this.textData.color ) this.color = this.textData.color;
      if( this.textData.font ) this.font = this.textData.font;
      if( this.textData.stroke ){
        this.stroke = this.textData.stroke;
        this.strokeColor = this.textData?.strokeColor;
        this.setStrokeStyle();
      }
      if( this.textData.bold === false ) this.bold = false;
      this.updateSpanStyle();
    }
    if( changes.text ){
      this.textResize();
    }
    if( changes.shadowObj && this.shadowObj ){
      this.shadowStyle = `text-shadow: ${this.shadowObj['text-shadow']}`;
    }
  }

  protected setStrokeStyle(){
    this.strokeStyle = StyleX.textStroke( this.stroke, this.strokeColor );
  }
}
