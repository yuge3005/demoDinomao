import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appScrollBar]',
  host: {
    '[style.height]': "appScrollBar + 'px'",
    '[style.overflow]': "'hidden scroll'"
  }
})
export class ScrollBarDirective {

  @Input() appScrollBar: number = 120;
  @Output() scrollOut: EventEmitter<null> = new EventEmitter<null>();

  constructor( private ref: ElementRef ) { }

  @HostListener('scroll') onScroll(){
    let refs = this.ref.nativeElement;
    if( refs.scrollTop + this.appScrollBar >= refs.scrollHeight ){
      this.scrollOut.emit();
    }
  }
}