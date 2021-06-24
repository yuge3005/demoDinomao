import { Component, Input, SimpleChanges } from '@angular/core';
import { ImageButtonComponent } from '../image-button/image-button.component';
import { BitmapData } from '../image/bitmap-data';

@Component({
  selector: 'app-image-scale-button',
  templateUrl: './image-scale-button.component.html',
  styleUrls: ['./image-scale-button.component.css']
})
export class ImageScaleButtonComponent extends ImageButtonComponent {

  @Input() buttonIcon!: BitmapData;

  constructor() { 
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
}
