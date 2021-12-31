import { StyleX } from './../../../basicUI/tools/StyleX';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 17:32:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 10:31:39
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
    this.textureUrl = "assets/address/user_address/user_address.json";
  }

  initUI() {
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );

    this.setAddressListData();
    UserAddress.addressChangeCallback = this.setAddressListData.bind( this );

    this.styles.borderRadius = StyleX.borderRadius(28);
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
