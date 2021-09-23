/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-23 09:42:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-23 11:30:37
*/
import { Component } from '@angular/core';
import { ImageComponent } from '../../../basicUI/basic-ui.module';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-image-rotating',
  templateUrl: './image-rotating.component.html',
  styleUrls: ['./image-rotating.component.css'],
  animations: [
    trigger('carousel',[
      state('p0', style({transform: 'rotateZ(0deg)'})),
      state('p1', style({transform: 'rotateZ(180deg)'})),
      state('p2', style({transform: 'rotateZ(360deg)'})),
      transition('p0 => p1', [animate('2s')]),
      transition('p1 => p2', [animate('2s')]),
      transition('p2 => p3', [animate('0s')]),
    ])
  ]
})
export class ImageRotatingComponent extends ImageComponent {

  carouselState: string = "p0";

  constructor() {
    super();
  }

  ngOnInit() {
    this.carouselState = "p1";
  }

  onAnimationEvent( event: any ) {
    let stateIndex: number = Number( ( event.toState as string ).charAt(1) );
    stateIndex = ++stateIndex % 4;
    this.carouselState = "p" + stateIndex;
  }
}
