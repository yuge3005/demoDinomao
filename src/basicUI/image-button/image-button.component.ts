/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-06-29 14:45:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-13 17:26:10
*/
import { Component, Output, EventEmitter } from '@angular/core';
import { Point } from '../geom/point';
import { ImageComponent } from '../image/image.component';
import { SoundManager } from '../sound/SoundManager';

@Component({
  selector: 'app-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.css']
})
export class ImageButtonComponent extends ImageComponent {

  @Output() itemClick: EventEmitter<Point> = new EventEmitter<Point>();

  constructor() { 
    super();
  }

  onButtonClick( event: any ){
    let pt: Point = new Point().init( event.offsetX, event.offsetY );
    this.itemClick.emit( pt );

    if( SoundManager.defaltButtonSound ) SoundManager.play( SoundManager.defaltButtonSound )
  }
}
