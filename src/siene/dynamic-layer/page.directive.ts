import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicContainer]'
})
export class PageDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
