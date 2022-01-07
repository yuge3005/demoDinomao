import { TextInput } from '../text-input';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-05 11:55:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 14:52:25
 */
@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent extends TextInput{

  constructor() {
      super();
      this.multiline = "multiline";
  }
}