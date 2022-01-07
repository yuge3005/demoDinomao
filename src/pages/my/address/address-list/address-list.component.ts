/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:12:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 13:56:40
 */
  import { Component } from '@angular/core';
  import { ScrollList } from '../../../../basicUI/basic-ui.module';
  import { Trigger } from '../../../../service/dinomao-game.module';
  
  @Component({
    selector: 'app-address-list',
    templateUrl: './address-list.component.html',
    styleUrls: ['./address-list.component.css']
  })
  export class AddressListComponent extends ScrollList {
  
    constructor() {
      super();
    }
  
  }
  