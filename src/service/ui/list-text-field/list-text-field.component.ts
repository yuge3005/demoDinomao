/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-09 13:50:29
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:37:38
*/
import { Component } from '@angular/core';
import { TextFieldComponent } from 'resize-able-ui';

@Component({
  selector: 'app-list-text-field',
  templateUrl: './list-text-field.component.html',
  styleUrls: ['./list-text-field.component.css']
})
export class ListTextFieldComponent extends TextFieldComponent {

  constructor() { 
    super();
  }
  
}
