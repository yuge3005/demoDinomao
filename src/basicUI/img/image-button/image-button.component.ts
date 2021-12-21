/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-06-29 14:45:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-25 17:39:52
*/
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Point } from '../../geom/point';
import { ImageComponent } from '../image/image.component';
import { SoundManager } from '../../sound/SoundManager';

@Component({
  selector: 'app-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.css']
})
export class ImageButtonComponent extends ImageComponent {

  @Output() itemClick: EventEmitter<Point> = new EventEmitter<Point>();
  @Input() soundUrl: string = "";

  constructor() {
    super();
  }

  onButtonClick( event: any ){
    let pt: Point = new Point().init( event.offsetX, event.offsetY );
    this.itemClick.emit( pt );

    if( this.soundUrl ) SoundManager.play( this.soundUrl );
    else if( SoundManager.defaltButtonSound ) SoundManager.play( SoundManager.defaltButtonSound );
  }
}
