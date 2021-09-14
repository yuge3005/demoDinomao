/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-14 11:43:09
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-09-14 13:01:29
*/
import { Component } from '@angular/core';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { ListItemComponent } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center-item',
  templateUrl: './user-center-item.component.html',
  styleUrls: ['./user-center-item.component.css']
})
export class UserCenterItemComponent extends ListItemComponent {

  itemBg!: BitmapData;

  constructor() { 
    super();
  }

  initUI(){
    
  }

}
