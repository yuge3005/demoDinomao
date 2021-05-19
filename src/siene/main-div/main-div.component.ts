import { ResizeAbleService } from './../../globalSetting/resize-able.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-div',
  templateUrl: './main-div.component.html',
  styleUrls: ['./main-div.component.css']
})
export class MainDivComponent implements OnInit {
  matrix: string = '';
  constructor( private resizeSv: ResizeAbleService ) { }

  ngOnInit() {
    this.matrix = this.resizeSv.getMatrix( true, true );
  }
}
