import { StyleX } from '../tools/StyleX';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Rectangle } from '../geom/rectangle';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-28 11:08:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-14 14:12:54
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
  @Input() activeStyle: Object = StyleX.backgroundColor( 0xFFFFFF );
  @Input() disActiveStyle: Object = StyleX.backgroundColor( 0, 0.3 );
  containnerRect: Object = {};
  spanStyle: Object = {};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.rect && this.rect ){
      this.containnerRect = StyleX.setItemToRectangle( this.rect );
      this.spanStyle = this.resetSpanStyle( this.rect.height );
    }
  }
  
  resetSpanStyle( diameter: number ): Object{
    let sick: number = Math.round( diameter * 0.3 );
    return StyleX.combine( StyleX.borderRadius( diameter, false ), StyleX.setSize( diameter, diameter ), StyleX.border( sick, '#fff' ), StyleX.anchorOffset( -diameter, 0 ) );
  }
}
