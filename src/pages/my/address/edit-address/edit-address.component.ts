/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-04 10:13:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-04 10:26:17
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, AddressData, UserAddress } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent extends MainPage {

  backBtn!: BitmapData;

  constructor() { 
    super();
  }

  initUI() {
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );
  }

  setData( data: any = null ){
    console.log( "data" )
    console.log( data );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.ADDRESS );
  }
}
