import { BitmapData } from './../../../../basicUI/image/bitmap-data';
import { TextData } from '../../../../service/gameData/TextData';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-25 11:43:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-25 13:35:19
 */
import { ImageScaleButtonComponent } from '../../../../basicUI/basic-ui.module';
import { Component, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent extends ImageScaleButtonComponent {

  playText!: TextData;
  playString: string = "";

  @Input() coinIcon!: BitmapData;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.imgData || changes.buttonIcon ) super.ngOnChanges( changes );

    if( this.imgData ){
      this.iconStyle = `
          background-image: url("${this.buttonIcon.url}");
          width: ${this.buttonIcon.w}px;
          height: ${this.buttonIcon.h}px;
          background-position: -${this.buttonIcon.x}px -${this.buttonIcon.y}px;
          left: ${this.imgData.w * 0.5 + this.buttonIcon.left}px;
          top: ${this.imgData.h * 0.5 + this.buttonIcon.top}px;
          margin-left: ${-this.buttonIcon.w * 0.5}px;
          margin-top: ${-this.buttonIcon.h * 0.5}px;
        `
    }
  }
}
