/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 17:32:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 09:30:34
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, TextData, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent extends MainPage {

  backBtn!: BitmapData;

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/address/address.json";
  }

  initUI() {
    Loading.status = 2;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }
}
