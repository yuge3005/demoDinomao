import { UIComponent, BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, Trigger, WebPages } from '../../../service/dinomao-game.module';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-12 11:32:06
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-12 11:44:45
 */

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent extends UIComponent implements MainPage {
  pageHeight: number = 0;

  backBtn!: BitmapData;
  title!: BitmapData;
  
  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/contact/contact.json";
  }

  initUI() {
    Loading.status = 2;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.title = this.textureData.getTexture( "CONTACT US", 265, 147 );
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData(){}

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }
}
