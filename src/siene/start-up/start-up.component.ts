import { HttpClient } from '@angular/common/http';
import { MainPage, Loading } from '../../service/dinomao-game.module';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-14 13:31:19
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-14 14:00:20
 */

@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.component.html',
  styleUrls: ['./start-up.component.css']
})
export class StartUpComponent extends MainPage {

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/start_up/start_up.json";
  }

  initUI() {
    Loading.status = 2;
  }
}
