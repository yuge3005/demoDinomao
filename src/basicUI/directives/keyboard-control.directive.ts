import { Directive, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appKeyboardControl]'
})
export class KeyboardControlDirective implements OnDestroy{

  keyObject: any = {};
  @Input() eventKeyCodes!: any[];
  @Output() keyboardEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() keyCodeEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { 
    document.addEventListener( "keydown", this.onKeyDown.bind(this) );
    document.addEventListener( "keyup", this.onKeyUp.bind(this) );
  }

  onKeyDown( e: KeyboardEvent ){
    this.keyObject[e.keyCode] = true;
    this.dispatchKeyCode(e.keyCode);
  }

  onKeyUp( e: KeyboardEvent ){
    this.keyObject[e.keyCode] = false;
    this.dispatchKeyCode(e.keyCode);
  }

  dispatchKeyCode( keyCode: number ){
    if( this.eventKeyCodes?.indexOf( keyCode ) && this.keyObject[keyCode] ){
      this.keyCodeEvent.emit(keyCode);
    }
    this.keyboardEvent.emit(this.keyObject);
  }

  ngOnDestroy(){
    document.removeEventListener( "keydown", this.onKeyDown.bind(this) );
    document.removeEventListener( "keyup", this.onKeyUp.bind(this) );
  }
}
