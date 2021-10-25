/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-25 11:43:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-25 11:49:04
 */
import { ImageScaleButtonComponent } from '../../../../basicUI/basic-ui.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent extends ImageScaleButtonComponent {

  constructor() {
    super();
  }

}
