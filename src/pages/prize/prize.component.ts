/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 16:34:24
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-09 16:58:42
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css']
})
export class PrizeComponent extends MainPage {

  constructor() {
    super();
    this.textureUrl = "assets/prize/prize.json";
  }

  initUI() {
    Loading.status = 1;
  }
}
