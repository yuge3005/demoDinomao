/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-27 14:31:41
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-15 16:49:08
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
  @Input() text: string = "";
  @Input() color: number = 0;
  @Input() size: number = 10;
  @Input() font: string = "";
  @Input() bold: boolean = false;
  @Input() align: string = "center";
  @Input() stroke: number = 0;
  @Input() strokeColor: number = 0;

  txtRect: Rectangle = new Rectangle( 0, 0, 100, 20 );
  textStr: string = "";
  colorStr: string = "#000000";
  sizeStr: string = "10px";
  fontStr: string = "Arial";
  fontBold: string = "normal";
  textAlign: string = "center";
  fontStroke: string = "";

  @ViewChild('sp', {static: true}) sp!: ElementRef;

  sizeOrTextChanged: boolean = false;
  multiViewCheck: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.positionRect ){
      this.txtRect = changes.positionRect.currentValue || this.txtRect;
    }
    if( changes.text ){
      this.textStr = changes.text.currentValue;
      this.sizeStr = this.size + "px";
      this.sizeOrTextChanged = true;
    }
    if( changes.color ){
      this.colorStr = "#" + this.color.toString( 16 );
    }
    if( changes.size ){
      this.sizeStr = this.size + "px";
      this.sizeOrTextChanged = true;
    }
    if( changes.font ){
      this.fontStr = this.fontStr;
    }
    if( changes.bold ){
      this.fontBold = this.bold ? "bold" : "normal";
    }
    if( changes.align ){
      this.textAlign = this.align;
    }
    if( changes.stroke || changes.strokeColor ){
      this.fontStroke = this.stroke ?  this.stroke + "px #" + this.strokeColor.toString(16) : "";
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
