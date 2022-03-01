/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 17:32:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 11:02:19
 */
import { Component } from '@angular/core';
import { StyleX } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, Loading, AddressData, UserAddress } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html'
})
export class AddressComponent extends MainPage {

  userAddressList!: AddressData[];

  constructor() {
    super();
    this.textureUrl = "assets/address/user_address/user_address.json";
  }

  initUI() {
    this.ui.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );

    this.setAddressListData();
    UserAddress.addressChangeCallback = this.setAddressListData.bind( this );

    this.styles.addressList = StyleX.combine( StyleX.borderRadius(28), StyleX.setItemPosition(10,265), StyleX.backgroundColor(0xFFD33F), StyleX.border(3,0xad8321), StyleX.setSize(726,0,true,false) );
    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.styles.scrollBar = StyleX.combine( StyleX.setItemPosition(10,10), StyleX.setSize(720,0,true,false) );
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
