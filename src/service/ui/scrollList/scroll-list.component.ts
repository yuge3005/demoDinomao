/*
* @Description:
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-06 17:42:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-08 09:32:33
*/
import { Component, Input, ViewChild, ElementRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Application, UIFromParent, Point } from '../../../basicUI/basic-ui.module';

@Component({
  template: ''
})
export class ScrollListComponent extends UIFromParent {

  @Input() listHeight: number = 0;
  @Input() listData!: any[];

  @Output() overMax: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('scrollBar', {static: true}) scrollBar!: ElementRef;


  protected draging: Point | null = null;
  protected moving: Point | null = null;
  private dragingStartTime!: Date;
  private scrollYStart: number = 0;
  
  _scrollY: number = 0;
  get scrollY(): number{
    return this._scrollY;
  }
  set scrollY( value: number ){
    let minY: number = this.minY();
    if( value < minY ){
      if( value - minY < -100 ) this.overMax.emit();
      value = minY;
    }
    if( value > 0 ) value = 0;
    this._scrollY = value;
  }

  minY(): number{
    return 0;
  }

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );
    if( this.listData?.length == 0 ){
      this.scrollY = 0;
    }
  }


  subUIinit(){
    super.subUIinit();

    if( this.scrollBar ){
      if( Application.system.isMobile() ){
        this.scrollBar.nativeElement.addEventListener( "touchstart", this.onTouchStart.bind( this ) );
        this.scrollBar.nativeElement.addEventListener( "touchmove",  this.onTouchMove.bind( this ) );
        this.scrollBar.nativeElement.addEventListener( "touchend",  this.stopDrag.bind( this ) );
        this.scrollBar.nativeElement.addEventListener( "touchcancel",  this.stopDrag.bind( this ) );
      }
      else{
        this.scrollBar.nativeElement.addEventListener( "mousedown", this.onDrag.bind(this) );
        this.scrollBar.nativeElement.addEventListener( "mousemove", this.onMove.bind(this) );
        this.scrollBar.nativeElement.addEventListener( "mouseup", this.stopDrag.bind(this) );
        this.scrollBar.nativeElement.addEventListener( "mouseout", this.stopDrag.bind(this) );
      }
    }
    document.addEventListener( "wheel", this.onWheel.bind(this) );
  }

  ngOnDestroy(): void {
    if( this.scrollBar ){
      if( Application.system.isMobile() ){
        this.scrollBar.nativeElement.removeEventListener( "touchstart", this.onTouchStart.bind( this ) );
        this.scrollBar.nativeElement.removeEventListener( "touchmove",  this.onTouchMove.bind( this ) );
        this.scrollBar.nativeElement.removeEventListener( "touchend",  this.stopDrag.bind( this ) );
        this.scrollBar.nativeElement.removeEventListener( "touchcancel",  this.stopDrag.bind( this ) );
      }
      else{
        this.scrollBar.nativeElement.removeEventListener( "mousedown", this.onDrag.bind(this) );
        this.scrollBar.nativeElement.removeEventListener( "mousemove", this.onMove.bind(this) );
        this.scrollBar.nativeElement.removeEventListener( "mouseup", this.stopDrag.bind(this) );
        this.scrollBar.nativeElement.removeEventListener( "mouseout", this.stopDrag.bind(this) );
      }
    }
    document.removeEventListener( "wheel", this.onWheel.bind(this) );
  }

  onWheel( event: WheelEvent ){
    this.scrollY += -event.deltaY;
  }

  stopDrag(){
    this.draging = null;
  }

  onDrag( event: MouseEvent ): void{
    event.preventDefault();
    this.moving = this.draging = new Point().init( event.clientX, event.clientY );
    this.dragingStartTime = new Date;
    this.scrollYStart = this.scrollY;
  }

  onTouchStart( event: TouchEvent ): void{
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    this.moving = this.draging = new Point().init( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
    this.dragingStartTime = new Date;
    this.scrollYStart = this.scrollY;
  }

  onMove( event: MouseEvent ){
    event.preventDefault();
    if( this.draging ){
      this.scrollY = ( event.clientY - this.draging.y ) / Application.settings.scaleY + this.scrollYStart;
      this.moving = new Point().init( event.clientX, event.clientY );
    }
  }

  onTouchMove( event: TouchEvent ){
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    if( this.draging ){
      this.scrollY = ( event.changedTouches[0].clientY - this.draging.y ) / Application.settings.scaleY + this.scrollYStart;
      this.moving = new Point().init( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
    }
  }

  onItemClick( itemData: any ): boolean {
    if( new Date().getTime() - this.dragingStartTime.getTime() > 200 ) return false;
    if( !this.draging ) return false;
    if( this.draging && this.moving && Point.distance( this.moving, this.draging ) > 10 ) return false;
    return true;
  }
}
