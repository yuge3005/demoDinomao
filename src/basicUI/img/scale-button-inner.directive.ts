import { Directive, Input } from '@angular/core';
import { BitmapData } from './bitmap-data';
import { ImageDirective } from './image.directive';

@Directive({
  selector: '[scaleButtonInner]'
})
export class ScaleButtonInnerDirective extends ImageDirective {

  @Input() scaleButtonInner!: BitmapData;
  @Input() noBackground: boolean = false;

  ngOnChanges(): void {
    this.appImage = this.scaleButtonInner;
    super.ngOnChanges();
    if( this.noBackground ){
      this.imgStyle = this.imgStyle.replace( /left.+;/, "" );
      this.imgStyle = this.imgStyle.replace( /top.+;/, "" );
    }
  }
}
