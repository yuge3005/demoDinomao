import { Rectangle } from './../../geom/Rectangle';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit, OnChanges {

  @Input() textStyle!: Rectangle;
  @Input() textStr: string = "";

  txtStyle: string = "";
  text: string = "";
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.txtStyle = `
      left: ${this.textStyle.y}px;
      top: ${this.textStyle.y}px;
      width: ${this.textStyle.width}px;
      height: ${this.textStyle.height}px;
      line-height: ${this.textStyle.height}px;
    `
  }

}
