import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Point } from '../geom/point';
import { SoundManager } from '../sound/SoundManager';
import { BitmapData } from './bitmap-data';
import { ImageDirective } from './image.directive';

@Directive({
  selector: '[appImageButton]',
  host: {
    '[attr.style]': 'imgStyle'
  }
})
export class ImageButtonDirective extends ImageDirective{

  @Output() itemClick: EventEmitter<Point> = new EventEmitter<Point>();
  @Input() soundUrl: string = "";
  @Input() appImageButton!: BitmapData;

  ngOnChanges(): void {
    this.appImage = this.appImageButton;
    super.ngOnChanges();
    this.imgStyle += 'cursor: pointer;';
  }

  @HostListener('click') onButtonClick( event: any ){
    let pt: Point = new Point().init( event.offsetX, event.offsetY );
    this.itemClick.emit( pt );

    if( this.soundUrl ) SoundManager.play( this.soundUrl );
    else if( SoundManager.defaltButtonSound ) SoundManager.play( SoundManager.defaltButtonSound );
  }
}
