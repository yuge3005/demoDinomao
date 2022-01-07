/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-06 17:42:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 11:09:17
*/
import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { UIFromParent } from '../ui/UIFromParent';

@Component({
  template: ''
})
export class ScrollList extends UIFromParent {

  @Input() listHeight: number = 0;
  @Input() listData!: any[];

  @Output() overMax: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('scrollBar', {static: true}) scrollBar!: ElementRef;

  constructor() {
    super();
  }

  subUIinit(){
    super.subUIinit();

    if( this.scrollBar ){
      this.scrollBar.nativeElement.style.overflowX = "hidden";
      this.scrollBar.nativeElement.style.overflowY = "scroll";
    }
  }
}
