/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2022-01-07 15:47:56
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 16:54:48
*/
import { Component, Input, SimpleChanges } from '@angular/core';
import { TextFieldComponent } from '../text-field/text-field.component';

@Component({
  selector: 'app-text-shadow-stroke',
  templateUrl: './text-shadow-stroke.component.html',
  styleUrls: ['./text-shadow-stroke.component.css']
})
export class TextShadowStrokeComponent extends TextFieldComponent {

  shadowStyle!: string;
  @Input() shadowObj!: any;
  @Input() strokeStyle!: Object; 

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );
    if( this.shadowObj ){
      this.shadowStyle = `text-shadow: ${this.shadowObj['text-shadow']}`;
    }
  }
}
