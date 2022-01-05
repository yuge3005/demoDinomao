/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-23 09:42:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:37:32
*/
import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ImageComponent, Tween } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-image-rotating',
  templateUrl: './image-rotating.component.html'
})
export class ImageRotatingComponent extends ImageComponent implements OnDestroy {

  @ViewChild('carousel', {static: true}) carousel!: ElementRef;

  private _rotate: number = 0;
  set rotate( value: number ){
    this._rotate = value;
    if( this.carousel ) this.carousel.nativeElement.style.transform = 'rotateZ(' + value + 'deg)';
  }
  get rotate(): number{
    return this._rotate;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    Tween.to( this, 20, { rotate: 1800 }, 0, this.onAnimationEvent.bind( this ) );
  }

  onAnimationEvent() {
    this.rotate = 0;
    Tween.to( this, 20, { rotate: 1800 }, 0, this.onAnimationEvent.bind( this ) );
  }

  ngOnDestroy(){
    Tween.kill( this );
  }
}
