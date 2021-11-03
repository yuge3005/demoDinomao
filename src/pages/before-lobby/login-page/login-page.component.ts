/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-03 15:23:53
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-03 15:31:42
 */
import { MainPage } from './../../../service/ui/MainPage.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent extends MainPage{

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
