import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UIComponent } from '../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-07 14:07:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-12 11:58:56
 */
@Component({
  template: ''
})
export class MainPage extends UIComponent{
  pageHeight: number = 0;

  constructor( public http: HttpClient ) {
    super(http);
  }
  
  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: any = null ){}
}
