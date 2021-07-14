/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-29 14:45:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 14:12:50
 */
import { Component, Output, EventEmitter } from '@angular/core';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.css']
})
export class ImageButtonComponent extends ImageComponent {

  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
    super();
  }

  onButtonClick(){
    this.itemClick.emit();
  }
}
