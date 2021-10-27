/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 16:42:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-27 17:21:39
 */
import { Component } from '@angular/core';
import { BitmapData, Application, ListItemComponent } from '../../../../basicUI/basic-ui.module';
import { TextData } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.css']
})
export class RecordItemComponent extends ListItemComponent {

  constructor() { 
    super();
  }

  initUI(){
  }
}
