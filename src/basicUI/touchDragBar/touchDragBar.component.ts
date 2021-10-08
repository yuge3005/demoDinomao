import { Point } from '../geom/point';
import { Application } from '../settings/Application';
import { Rectangle } from '../geom/rectangle';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-28 18:07:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-08 10:58:11
 */

@Component({
  selector: 'app-touchDragBar',
  templateUrl: './touchDragBar.component.html',
  styleUrls: ['./touchDragBar.component.css']
})
export class TouchDragBarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rect!: Rectangle;
  styleString: string = "";

  @ViewChild('touchDragBar', {static: true}) touchDragBar!: ElementRef;

  protected draging: Point | null = null;
  protected moving: Point | null = null;
  private dragingStartTime!: Date;

  constructor() { }

  ngOnInit() {
    if( this.touchDragBar ){
      if( Application.system.isMobile() ){
        this.touchDragBar.nativeElement.addEventListener( "touchstart", this.onTouchStart.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "touchmove",  this.onTouchMove.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "touchend",  this.stopDrag.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "touchcancel",  this.stopDrag.bind(this) );
      }
      else{
        this.touchDragBar.nativeElement.addEventListener( "mousedown", this.onDrag.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "mousemove", this.onMove.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "mouseup", this.stopDrag.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "mouseout", this.stopDrag.bind(this) );
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.rect ){
      this.styleString = `
        left: ${this.rect.x}px;
        top: ${this.rect.y}px;
        width: ${this.rect.width}px;
        height: ${this.rect.height}px;
      `;
    }
  }

  ngOnDestroy(){
    if( this.touchDragBar ){
      if( Application.system.isMobile() ){
        this.touchDragBar.nativeElement.removeEventListener( "touchstart", this.onTouchStart.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "touchmove",  this.onTouchMove.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "touchend",  this.stopDrag.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "touchcancel",  this.stopDrag.bind(this) );
      }
      else{
        this.touchDragBar.nativeElement.removeEventListener( "mousedown", this.onDrag.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "mousemove", this.onMove.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "mouseup", this.stopDrag.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "mouseout", this.stopDrag.bind(this) );
      }
    }
  }

  stopDrag(){
    this.draging = null;
  }

  onDrag( event: MouseEvent ): void{
    event.preventDefault();
    this.moving = this.draging = new Point().init( event.clientX, event.clientY );
    this.dragingStartTime = new Date;
  }

  onTouchStart( event: TouchEvent ): void{
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    this.moving = this.draging = new Point().init( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
    this.dragingStartTime = new Date;
  }

  onMove( event: MouseEvent ){
    event.preventDefault();
    if( this.draging ){
      this.moving = new Point().init( event.clientX, event.clientY );
    }
  }

  onTouchMove( event: TouchEvent ){
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    if( this.draging ){
      this.moving = new Point().init( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
    }
  }
}
