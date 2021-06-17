import { Component } from '@angular/core';
import { ResizeAble } from '../../basicUI/ui/ResizeAble';

@Component({
  selector: 'app-main-div',
  templateUrl: './main-div.component.html',
  styleUrls: ['./main-div.component.css']
})
export class MainDivComponent extends ResizeAble {

  poObject!: Object;
  showShadow: boolean = false;

  constructor() {
    super();
  }
}
