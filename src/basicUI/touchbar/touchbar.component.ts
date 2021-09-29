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
 * @LastEditTime: 2021-09-29 09:50:01
 */

@Component({
  selector: 'app-touchbar',
  templateUrl: './touchbar.component.html',
  styleUrls: ['./touchbar.component.css']
})
export class TouchbarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rect!: Rectangle;
  styleString: string = "";

  @ViewChild('touchBar', {static: true}) touchBar!: ElementRef;

  protected draging: Point | null = null;
  protected moving: Point | null = null;
  private dragingStartTime!: Date;

  constructor() { }

  ngOnInit() {
    if( this.touchBar ){
      if( Application.system.isMobile() ){
        this.touchBar.nativeElement.addEventListener( "touchstart", this.onTouchStart.bind(this) );
        this.touchBar.nativeElement.addEventListener( "touchmove",  this.onTouchMove.bind(this) );
        this.touchBar.nativeElement.addEventListener( "touchend",  this.stopDrag.bind(this) );
        this.touchBar.nativeElement.addEventListener( "touchcancel",  this.stopDrag.bind(this) );
      }
      else{
        this.touchBar.nativeElement.addEventListener( "mousedown", this.onDrag.bind(this) );
        this.touchBar.nativeElement.addEventListener( "mousemove", this.onMove.bind(this) );
        this.touchBar.nativeElement.addEventListener( "mouseup", this.stopDrag.bind(this) );
        this.touchBar.nativeElement.addEventListener( "mouseout", this.stopDrag.bind(this) );
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
    if( this.touchBar ){
      if( Application.system.isMobile() ){
        this.touchBar.nativeElement.removeEventListener( "touchstart", this.onTouchStart.bind(this) );
        this.touchBar.nativeElement.removeEventListener( "touchmove",  this.onTouchMove.bind(this) );
        this.touchBar.nativeElement.removeEventListener( "touchend",  this.stopDrag.bind(this) );
        this.touchBar.nativeElement.removeEventListener( "touchcancel",  this.stopDrag.bind(this) );
      }
      else{
        this.touchBar.nativeElement.removeEventListener( "mousedown", this.onDrag.bind(this) );
        this.touchBar.nativeElement.removeEventListener( "mousemove", this.onMove.bind(this) );
        this.touchBar.nativeElement.removeEventListener( "mouseup", this.stopDrag.bind(this) );
        this.touchBar.nativeElement.removeEventListener( "mouseout", this.stopDrag.bind(this) );
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
