/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-04 10:13:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-08 15:15:25
 */
import { Component } from '@angular/core';
import { MainPage, Loading, AddressData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html'
})
export class EditAddressComponent extends MainPage {

  addressData!: AddressData;

  constructor() { 
    super();
    this.textureUrl = "assets/address/user_address/edit_address.json";
  }

  initUI() {
    Loading.status = 2;
  }

  setData( data: any = null ){
    this.addressData = data;
  }
}
