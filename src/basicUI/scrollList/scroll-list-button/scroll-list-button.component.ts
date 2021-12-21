/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-24 14:37:47
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-08 09:54:25
*/
import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { ImageComponent } from '../../img/image/image.component';
import { Application } from '../../settings/Application';

@Component({
  selector: 'app-scroll-list-button',
  templateUrl: './scroll-list-button.component.html',
  styleUrls: ['./scroll-list-button.component.css']
})
export class ScrollListButtonComponent extends ImageComponent {

  @Output() itemClick: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('buttonEntity', {static: true}) buttonEntity!: ElementRef;

  constructor() {
    super();
  }

  ngOnInit() {
    if( this.buttonEntity ){
      if( Application.system.isMobile() ){
        this.buttonEntity.nativeElement.addEventListener( "touchend", this.onItemClick.bind(this), true );
      }
      else{
        this.buttonEntity.nativeElement.addEventListener( "mouseup", this.onItemClick.bind(this), true );
      }
    }
  }

  ngOnDestroy(): void {
    if( this.buttonEntity ){
      if( Application.system.isMobile() ){
        this.buttonEntity.nativeElement.removeEventListener( "touchend", this.onItemClick.bind(this), true );
      }
      else{
        this.buttonEntity.nativeElement.removeEventListener( "mouseup", this.onItemClick.bind(this), true );
      }
    }
  }

  onItemClick( event: Event ){
    event.preventDefault();
    this.itemClick.emit();
  }
}
