/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-29 14:49:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-01 09:29:24
 */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, TextData, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent extends MainPage {

  backBtn!: BitmapData;
  title!: BitmapData;
  
  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/ledger/ledger.json";
  }

  initUI() {
    Loading.status = 2;
    
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
    this.title = this.textureData.getTexture( "about-us", 265, 147 );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

}
