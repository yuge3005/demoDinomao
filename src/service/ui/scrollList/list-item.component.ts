/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-06 17:03:02
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-09-06 17:16:41
*/
import { Component, Output, ViewChild, EventEmitter, ElementRef, Input } from '@angular/core';
import { UIFromParent, Application } from '../../../basicUI/basic-ui.module';

@Component({
  template: ''
})
export class ListItemComponent extends UIFromParent {

  @Input() itemData: any;
  @Input() index: number = 0;

  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('itemInList', {static: true}) itemInList!: ElementRef;

  constructor() {
    super()
  }

  subUIinit(){
    super.subUIinit();

    if( this.itemInList ){
      if( Application.system.isMobile() ){
        this.itemInList.nativeElement.addEventListener( "touchend", this.onItemClick.bind(this), true );
      }
      else{
        this.itemInList.nativeElement.addEventListener( "mouseup", this.onItemClick.bind(this), true );
      }
    }
  }

  onItemClick( event: Event ){
    event.preventDefault();
    this.itemClick.emit( this.itemData );
  }
  
  ngOnDestroy(): void {
    if( this.itemInList ){
      if( Application.system.isMobile() ){
        this.itemInList.nativeElement.removeEventListener( "touchend", this.onItemClick.bind(this), true );
      }
      else{
        this.itemInList.nativeElement.removeEventListener( "mouseup", this.onItemClick.bind(this), true );
      }
    }
  }
}
