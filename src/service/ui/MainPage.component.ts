import { Trigger } from '../gameUILogic/Trigger';
import { Component } from '@angular/core';
import { UIComponent } from 'resize-able-ui';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-07 14:07:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 10:32:20
 */
@Component({
  template: ''
})
export class MainPage extends UIComponent{
  pageHeight: number = 0;

  constructor() {
    super();
    Trigger.currentPage = this;
  }
  
  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: any = null ){}
}
