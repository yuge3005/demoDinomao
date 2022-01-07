/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-11-04 17:44:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 14:42:29
*/
import { Rectangle } from '../../geom/rectangle';
import { ImageComponent } from '../../img/image/image.component';
import { Component, Input, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  template: ''
})
export class TextInput extends ImageComponent{

  @Input() inputRect!: Rectangle;
  @Input() fontSize: number = 0;
  @Input() defautText: string = "";
  @Input() text: string = "";
  @Input() align: string = "left";
  @Input() font: string = "sys";
  @Input() weight: string = "normal";
  textInputStyle: string = "";

  multiline: string = "";

  @ViewChild('textInput', {static: true}) textInput!: ElementRef;

  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { 
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.imgData ) super.ngOnChanges( changes );

    if( changes.inputRect || changes.fontSize || changes.align || changes.font || changes.weight && this.inputRect ){
      this.textInputStyle = `
        width: ${this.inputRect.width}px;
        height: ${this.inputRect.height}px;
        left: ${this.inputRect.left}px;
        top: ${this.inputRect.top}px;
        font-size:${this.fontSize?this.fontSize:this.inputRect.height}px;
        vertical-align: ${this.multiline?"top":"middle"};
        text-align: ${this.align};
        font-family: ${this.font};
        font-weight: ${this.weight};
      `
    }

    if( changes.text && this.text ){
      this.textInput.nativeElement.value = this.text;
    }
  }

  onTextChange(){
    this.textChange.emit( this.textInput.nativeElement.value );
  }
}
