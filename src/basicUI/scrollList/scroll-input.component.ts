/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-11-04 17:44:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-05 11:54:22
*/
import { Application } from '../settings/Application';
import { Rectangle } from '../geom/rectangle';
import { ImageComponent } from '../image/image.component';
import { Component, Input, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  template: ''
})
export class ScrollInputComponent extends ImageComponent{

  @Input() inputRect!: Rectangle;
  @Input() fontSize: number = 0;
  @Input() defautText: string = "";
  textInputStyle: string = "";

  multiline: string = "";

  @ViewChild('textInput', {static: true}) textInput!: ElementRef;

  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { 
    super();
  }

  ngOnInit() {
    if( this.textInput ){
      if( Application.system.isMobile() ){
        this.textInput.nativeElement.addEventListener( "touchstart", this.onTouchStart.bind( this ) );
        this.textInput.nativeElement.addEventListener( "touchmove",  this.onTouchMove.bind( this ) );
        this.textInput.nativeElement.addEventListener( "touchend",  this.stopDrag.bind( this ) );
        this.textInput.nativeElement.addEventListener( "touchcancel",  this.stopDrag.bind( this ) );
      }
      else{
        this.textInput.nativeElement.addEventListener( "mousedown", this.onDrag.bind(this) );
        this.textInput.nativeElement.addEventListener( "mousemove", this.onMove.bind(this) );
        this.textInput.nativeElement.addEventListener( "mouseup", this.stopDrag.bind(this) );
        this.textInput.nativeElement.addEventListener( "mouseout", this.stopDrag.bind(this) );
      }
    }
  }

  ngOnDestroy(): void {
    if( this.textInput ){
      if( Application.system.isMobile() ){
        this.textInput.nativeElement.removeEventListener( "touchstart", this.onTouchStart.bind( this ) );
        this.textInput.nativeElement.removeEventListener( "touchmove",  this.onTouchMove.bind( this ) );
        this.textInput.nativeElement.removeEventListener( "touchend",  this.stopDrag.bind( this ) );
        this.textInput.nativeElement.removeEventListener( "touchcancel",  this.stopDrag.bind( this ) );
      }
      else{
        this.textInput.nativeElement.removeEventListener( "mousedown", this.onDrag.bind(this) );
        this.textInput.nativeElement.removeEventListener( "mousemove", this.onMove.bind(this) );
        this.textInput.nativeElement.removeEventListener( "mouseup", this.stopDrag.bind(this) );
        this.textInput.nativeElement.removeEventListener( "mouseout", this.stopDrag.bind(this) );
      }
    }
  }

  onTouchStart( event: TouchEvent ){
    event.stopPropagation();
  }

  onDrag( event: TouchEvent ){
    event.stopPropagation();
  }

  onTouchMove( event: TouchEvent ){
    event.stopPropagation();
  }

  onMove( event: TouchEvent ){
    event.stopPropagation();
  }

  stopDrag( event: MouseEvent | TouchEvent ){
    event.stopPropagation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.imgData ) super.ngOnChanges( changes );

    if( changes.inputRect || changes.fontSize && this.inputRect ){
      this.textInputStyle = `
        width: ${this.inputRect.width}px;
        height: ${this.inputRect.height}px;
        left: ${this.inputRect.left}px;
        top: ${this.inputRect.top}px;
        font-size:${this.fontSize?this.fontSize:this.inputRect.height}px;
        vertical-align: ${this.multiline?"top":"middle"};
      `
    }

    if( changes.defautText && this.defautText ){
      if( this.textInput.nativeElement.value == "" ) this.textInput.nativeElement.value = this.defautText;
    }
  }

  textOnfocus(){
    if( this.defautText ){
      if( this.textInput.nativeElement.value == this.defautText ) this.textInput.nativeElement.value = "";
    }
  }

  textOnblur(){
    if( this.defautText ){
      if( this.textInput.nativeElement.value == "" ) this.textInput.nativeElement.value = this.defautText;
    }
  }

  onTextChange(){
    this.textChange.emit( this.textInput.nativeElement.value );
  }
}
