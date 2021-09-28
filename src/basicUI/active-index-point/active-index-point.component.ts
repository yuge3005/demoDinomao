import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Rectangle } from '../geom/rectangle';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-28 11:08:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-28 14:37:00
*/

@Component({
  selector: 'app-active-index-point',
  templateUrl: './active-index-point.component.html',
  styleUrls: ['./active-index-point.component.css']
})
export class ActiveIndexPointComponent implements OnInit, OnChanges {
  
  @Input() rect!: Rectangle;
  @Input() items!: any[];
  @Input() activeIndex: number = 0;
  styleString: string = "";
  spanStyle: string = "";

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.rect ){
      let diameter: number = this.rect.height;
      let sick: number = Math.round( diameter * 0.3 );
      this.styleString = `
        left: ${this.rect.x}px;
        top: ${this.rect.y}px;
        width: ${this.rect.width}px;
        height: ${diameter}px;
      `;
      this.spanStyle = `
        height: ${diameter}px;
        width: ${diameter}px;
        border-radius: ${diameter}px;
        border: ${sick}px solid #fff;
        margin: 0 ${sick}px;
      `;
    }
  }

}
