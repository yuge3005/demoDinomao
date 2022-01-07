import { TextInput } from '../text-input';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-05 11:47:25
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 14:46:18
 */
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent extends TextInput{

    constructor() { 
        super();
    }
}
