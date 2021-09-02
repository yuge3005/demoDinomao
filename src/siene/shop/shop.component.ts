/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-01 17:54:02
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-09-02 14:56:33
*/
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from './../../basicUI/basic-ui.module';
import { MainPage, GoodsData, Loading } from './../../service/dinomao-game.module';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends UIComponent implements MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;
  
  data!: GoodsData;

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/control_bar/control_bar.json";
  }

  initUI(){
    Loading.status = 2;
  }

  ngOnDestroy(): void {
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: GoodsData ){
    this.data = data;
  }
}
