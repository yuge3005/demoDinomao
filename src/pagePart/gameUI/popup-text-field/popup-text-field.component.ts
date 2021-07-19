/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-07-19 12:00:32
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-19 13:55:10
*/
import { Rectangle } from './../../../basicUI/geom/rectangle';
import { TextData } from './../../../service/gameData/TextData';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popup-text-field',
  templateUrl: './popup-text-field.component.html',
  styleUrls: ['./popup-text-field.component.css']
})
export class PopupTextFieldComponent implements OnInit {

  @Input() textData!: TextData;
  @Input() text: string = "";

  txtRect: Rectangle = new Rectangle( 0, 0, 100, 20 );
  textAlign: string = "center";
  divStyle: string = "";
  
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
    if( changes.textData ){
      var rect: any = this.textData.rect;
      if( this.textData.align ) this.textAlign = this.textData.align;

      this.divStyle = `
        top: ${rect.y}px;
        left: ${rect.x}px;
        width: ${rect.w}px;
        height: ${rect.h}px;
        line-height: ${rect.h}px;
        text-align: ${this.textAlign};
      `

      if( price.color ) this.priceTextColor = price.color;
    if( price.size ) this.priceTextSize = price.size;
    if( price.font ) this.priceTextFont = price.font;
    if( price.stroke ) this.priceStroke = price.stroke;
    if( price.strokeColor ) this.priceStrokeColor = price.strokeColor;
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
      this.textAlign = this.align;
    }
    if( changes.stroke || changes.strokeColor ){
      this.fontStroke = this.stroke ?  this.stroke + "px #" + this.toString16( this.strokeColor ) : "";
    }
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
