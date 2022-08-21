import { StyleX } from '../tools/StyleX';
import { Point } from '../geom/point';
import { Application } from '../settings/Application';
import { Rectangle } from '../geom/rectangle';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-28 18:07:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-06 12:09:36
 */

@Component({
  selector: 'app-touchDragBar',
  templateUrl: './touchDragBar.component.html',
  styleUrls: ['./touchDragBar.component.css']
})
export class TouchDragBarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rect!: Rectangle;
  @Input() direction: number = 0;
  styleObj: Object = {};

  @ViewChild('touchDragBar', {static: true}) touchDragBar!: ElementRef;

  @Output() dragState: EventEmitter<number|Point> = new EventEmitter<number|Point>();
  @Output() itemClick: EventEmitter<Point> = new EventEmitter<Point>();

  protected draging: Point | null = null;
  protected moving: Point | null = null;
  private dragingStartTime: number = 0;

  constructor() { }

  ngOnInit() {
    if( this.touchDragBar ){
      if( Application.system.isMobile() ){
        this.touchDragBar.nativeElement.addEventListener( "touchstart", this.onTouchStart.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "touchmove",  this.onTouchMove.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "touchend",  this.onTouchEnd.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "touchcancel",  this.onTouchEnd.bind(this) );
      }
      else{
        this.touchDragBar.nativeElement.addEventListener( "mousedown", this.onDrag.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "mousemove", this.onMove.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "mouseup", this.onUp.bind(this) );
        this.touchDragBar.nativeElement.addEventListener( "mouseout", this.onUp.bind(this) );
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.rect && this.rect ){
      this.styleObj = StyleX.combine( StyleX.setItemToRectangle( this.rect ), StyleX.backgroundColor(0,0) ) ;
    }
  }

  ngOnDestroy(){
    if( this.touchDragBar ){
      if( Application.system.isMobile() ){
        this.touchDragBar.nativeElement.removeEventListener( "touchstart", this.onTouchStart.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "touchmove",  this.onTouchMove.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "touchend",  this.onTouchEnd.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "touchcancel",  this.onTouchEnd.bind(this) );
      }
      else{
        this.touchDragBar.nativeElement.removeEventListener( "mousedown", this.onDrag.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "mousemove", this.onMove.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "mouseup", this.onUp.bind(this) );
        this.touchDragBar.nativeElement.removeEventListener( "mouseout", this.onUp.bind(this) );
      }
    }
  }

  private startDrag( x: number, y: number ){
    this.moving = this.draging = new Point( x, y );
    this.dragingStartTime = Application.getTimer();
    this.dragState.emit( 0 );
  }

  onDrag( event: MouseEvent ): void{
    event.preventDefault();
    this.startDrag( event.clientX, event.clientY );
  }

  onTouchStart( event: TouchEvent ): void{
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    this.startDrag( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
  }

  private dragMove( x: number, y: number ){
    this.moving = new Point( x, y );
    if( this.draging ){
      if( this.direction ){
        this.dragState.emit( ( this.moving.y - this.draging.y ) / Application.settings.scaleY );
      }
      else{
        this.dragState.emit( ( this.moving.x - this.draging.x ) / Application.settings.scaleX );
      }
    }
  }

  onMove( event: MouseEvent ){
    event.preventDefault();
    if( this.draging ){
      this.dragMove( event.clientX, event.clientY );
    }
  }

  onTouchMove( event: TouchEvent ){
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    if( this.draging ){
      this.dragMove( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
    }
  }

  private stopDrag( x: number, y: number, offsetX: number, offsetY: number ){
    this.moving = new Point( x, y );
    if( Application.getTimer() - this.dragingStartTime <= 200 && this.draging && Point.distance( this.moving, this.draging ) <= 10 ){
      this.itemClick.emit( new Point( offsetX, offsetY ) );
    }
    this.dragState.emit( this.moving.subtract( this.draging as Point ) );
    this.draging = null;
  }

  onUp( event: MouseEvent ){
    event.preventDefault();
    if( this.draging ){
      this.stopDrag( event.clientX, event.clientY, event.offsetX, event.offsetY );
    }
  }

  onTouchEnd( event: TouchEvent ){
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    if( this.draging ){
      this.stopDrag( event.changedTouches[0].clientX, event.changedTouches[0].clientY, event.changedTouches[0].pageX / Application.settings.scaleX, event.changedTouches[0].pageY / Application.settings.scaleY );
    }
  }
}
