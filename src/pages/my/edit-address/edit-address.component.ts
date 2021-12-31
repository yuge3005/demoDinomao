/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-11-04 10:13:45
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-12-31 15:20:02
*/
import { Component } from '@angular/core';
import { StyleX } from '../../../basicUI/basic-ui.module';
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
    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
  }

  setData( data: any = null ){
    this.addressData = data;
  }
}
