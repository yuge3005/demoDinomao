/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-10 15:17:37
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-10 16:00:27
*/
import { Component, OnInit } from '@angular/core';
import { MainPage, Loading } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css']
})
export class UserCenterComponent implements OnInit, MainPage{

  pageHeight: number = 0;
  
  constructor() { }

  ngOnInit() {
    Loading.status = 2;
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}
}
