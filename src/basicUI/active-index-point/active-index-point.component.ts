import { StyleX } from '../tools/StyleX';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Rectangle } from '../geom/rectangle';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-28 11:08:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-30 12:04:34
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
  containnerRect: Object = {};
  spanStyle: Object = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.rect && this.rect ){
      let diameter: number = this.rect.height;
      let sick: number = Math.round( diameter * 0.3 );
      this.containnerRect = StyleX.setItemToRectangle( this.rect );
      let borderRadius: Object = StyleX.borderRadius( diameter, false );
      let spanSize: Object = StyleX.setSize( diameter, diameter );
      let spanSick: Object = { 'border': sick + 'px solid #fff', 'margin': '0 ' + sick + 'px' };
      this.spanStyle = StyleX.combine( borderRadius, spanSize, spanSick );
    }
  }

}
