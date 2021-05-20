import { Component } from '@angular/core';
import { ResizeAble } from '../ResizeAble';

@Component({
  selector: 'app-main-div',
  templateUrl: './main-div.component.html',
  styleUrls: ['./main-div.component.css']
})
export class MainDivComponent extends ResizeAble {

  poObject: Object | undefined;
  showShadow: boolean = true;

  constructor() {
    super();
  }
}
