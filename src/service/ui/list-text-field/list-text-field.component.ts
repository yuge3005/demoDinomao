/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-09 13:50:29
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-09 13:53:03
*/
import { Component } from '@angular/core';
import { TextFieldComponent } from '../../../basicUI/basic-ui.module';

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
