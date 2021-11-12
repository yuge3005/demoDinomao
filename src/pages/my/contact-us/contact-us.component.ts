import { Application } from 'resize-able-ui/lib/basic-ui.module';
import { MainPage, Loading } from '../../../service/dinomao-game.module';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-12 11:32:06
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-04 17:30:14
 */

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent extends MainPage {


  constructor() {
    super();
    this.textureUrl = "assets/contact/contact.json";
  }

  initUI() {
    Loading.status = 2;
    if( Application.system.isApp() ) Application.settings.enableResize = false;
  }

  ngOnDestroy(){
    if( Application.system.isApp() ) Application.settings.enableResize = true;
  }
}
