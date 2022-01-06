/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 17:32:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-06 10:27:09
 */
import { Component } from '@angular/core';
import { BitmapData, StyleX } from 'resize-able-ui';
import { MainPage, Trigger, Loading, AddressData, UserAddress } from '../../../service/dinomao-game.module';

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
    this.textureUrl = "assets/address/user_address/user_address.json";
  }

  initUI() {
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );

    this.setAddressListData();
    UserAddress.addressChangeCallback = this.setAddressListData.bind( this );

    this.styles.addressList = StyleX.combine( StyleX.borderRadius(28), StyleX.setItemPosition(10,265), StyleX.backgroundColor(0xFFD33F) );
    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
  }
  
  setAddressListData(){
    this.userAddressList = UserAddress.instance.addressList.concat();
    this.userAddressList.push( {} as AddressData );
    
    Loading.status = 2;
  }

  ngOnDestroy(){
    UserAddress.addressChangeCallback = null;
  }

  gotoBack(){
    Trigger.gotoPage( UserAddress.fromPage, "package" );
  }
}
