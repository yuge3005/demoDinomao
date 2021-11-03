/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 17:32:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-03 13:22:36
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, AddressData, UserAddress } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent extends MainPage {

  backBtn!: BitmapData;

  userAddressList!: AddressData[];

  constructor() {
    super();
    this.textureUrl = "assets/user_address/user_address.json";
  }

  initUI() {
    Loading.status = 2;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );

    // this.userAddressList = UserAddress.instance.addressList;
    // this.userAddressList.push( {} as AddressData );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }
}
