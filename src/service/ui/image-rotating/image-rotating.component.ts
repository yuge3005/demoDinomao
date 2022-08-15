/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-23 09:42:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:37:32
*/
import { Component, Input, OnDestroy } from '@angular/core';
import { BitmapData, Ease, Tween } from 'resize-able-ui';

@Component({
  selector: 'app-image-rotating',
  templateUrl: './image-rotating.component.html'
})
export class ImageRotatingComponent implements OnDestroy {

  rotate: number = 0;
  @Input() imgData!: BitmapData;

  ngOnInit() {
    Tween.to( this, 20, { rotate: 1800 }, 0, this.onAnimationEvent.bind( this ), Ease.Linear );
  }

  onAnimationEvent() {
    this.rotate = 0;
    Tween.to( this, 20, { rotate: 1800 }, 0, this.onAnimationEvent.bind( this ), Ease.Linear );
  }

  ngOnDestroy(){
    Tween.kill( this );
  }
}
