import { ScrollInput } from '../scroll-input';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-05 11:47:25
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-05 12:10:10
 */
@Component({
  selector: 'app-scroll-text-input',
  templateUrl: './scroll-text-input.component.html',
  styleUrls: ['./scroll-text-input.component.css']
})
export class ScrollTextInputComponent extends ScrollInput{

    constructor() { 
        super();
    }
}
