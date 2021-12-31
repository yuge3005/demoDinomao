import { Application, StyleX } from 'resize-able-ui';
import { MainPage, Loading } from '../../../service/dinomao-game.module';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-12 11:32:06
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 15:18:34
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

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
  }

  ngOnDestroy(){
    if( Application.system.isApp() ) Application.settings.enableResize = true;
  }
}
