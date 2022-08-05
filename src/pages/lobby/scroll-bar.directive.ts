import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appScrollBar]'
})
export class ScrollBarDirective {

  @Input() appScrollBar: number = 0;
  @Output() scrollOut: EventEmitter<null> = new EventEmitter<null>();

  constructor( private ref: ElementRef ) { }

  @HostListener('scroll') onScroll(){
    let refs = this.ref.nativeElement;
    if( refs.scrollTop + this.appScrollBar >= refs.scrollHeight ){
      this.scrollOut.emit();
    }
  }
}
