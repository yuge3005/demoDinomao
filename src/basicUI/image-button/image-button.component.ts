import { Component, Output, EventEmitter } from '@angular/core';
import { MachineData } from 'src/service/machine-data';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-image-button',
  templateUrl: './image-button.component.html',
  styleUrls: ['./image-button.component.css']
})
export class ImageButtonComponent extends ImageComponent {

  @Output() itemClick: EventEmitter<MachineData> = new EventEmitter<MachineData>();

  constructor() { 
    super();
  }

  onButtonClick(){
    this.itemClick.emit();
  }
}
