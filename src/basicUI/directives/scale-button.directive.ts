import { ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Tween } from '../tween/Tween';

@Directive({
  selector: '[appScaleButton]'
})
export class ScaleButtonDirective {

  @Input() smooth: Boolean = true;
  @Input() enabled: Boolean = true;

  @ContentChild('carousel', {static: true}) carousel!: ElementRef;

  private _scale: number = 1;
  set scale( value: number ){
    this._scale = value;
    if( this.carousel ) this.carousel.nativeElement.style.transform ='scale(' + value + ')';
  }
  get scale(): number{
    return this._scale;
  }

  @Output() touchDown: EventEmitter<any> = new EventEmitter<any>();
  @Output() touchUp: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  @HostListener('mousedown') onMousedown(){
    this.onDown();
  }

  @HostListener('touchstart') onTouchstart(){
    this.onDown();
  }
  
  @HostListener('mouseup') onMouseup(){
    this.onUp();
  }

  @HostListener('mouseout') onMouseout(){
    this.onUp();
  }

  @HostListener('touchend') onTouchend(){
    this.onUp();
  }

  @HostListener('touchcancel') onTouchcancel(){
    this.onUp();
  }

  onDown(){
    if( !this.enabled ) return;
    if( this.smooth ){
      Tween.kill( this );
      Tween.to( this, 0.16, { scale: 0.9 } )
    }
    else this.scale = 0.9;
    this.touchDown.emit();
  }

  onUp(){
    if( this.smooth ){
      Tween.kill( this );
      Tween.to( this, 0.16, { scale: 1 } )
    }
    else this.scale = 1;
    this.touchUp.emit();
  }
}
