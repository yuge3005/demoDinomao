/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-11-04 10:13:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 13:58:44
*/
import { Component } from '@angular/core';
import { StyleX, Rectangle, KeyValue } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading, AddressData, Trigger, WebPages, GameHttp, UserAddress, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html'
})
export class EditAddressComponent extends MainPage {

  addressData!: AddressData;

  inputRect: Rectangle = new Rectangle().init( 30, 18, 650, 42 );
  nameRect: Rectangle = new Rectangle().init( 30, 18, 275, 42 );
  addressStrRect: Rectangle = new Rectangle().init( 30, 18, 650, 108 );

  firstName: string = "";
  lasetName: string = "";
  phoneNum: string = "";
  email: string = "";
  country: string = "";
  state: string = "";
  city: string = "";
  addressString: string = "";
  zipCode: string = "";

  constructor() { 
    super();
    this.textureUrl = "assets/address/user_address/edit_address.json";
  }

  initUI() {
    Loading.status = 2;

    this.ui.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );

    this.ui.firstNameInput = this.textureData.getTexture( "bg0", 10, 15 );
    this.ui.lasetNameInput = this.textureData.getTexture( "bg0", 385, 15 );
    this.ui.phoneNumInput = this.textureData.getTexture( "bg1", 10, 115 );
    this.ui.emailInput = this.textureData.getTexture( "bg1", 10, 215 );
    this.ui.countryInput = this.textureData.getTexture( "bg1", 10, 550 );
    this.ui.stateInput = this.textureData.getTexture( "bg1", 10, 650 );
    this.ui.cityInput = this.textureData.getTexture( "bg1", 10, 750 );
    this.ui.addressStringInput = this.textureData.getTexture( "bg2", 10, 375 );
    this.ui.zipCodeInput = this.textureData.getTexture( "bg1", 10, 850 );

    this.ui.saveBtn = this.textureData.getTexture( "btn_save", 200, 955 );

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.styles.scrollBar = StyleX.combine( StyleX.scrollBar(), StyleX.setSize(750,0,true,false) );
    this.styles.addressList = StyleX.combine( StyleX.borderRadius(28), StyleX.setItemRect(10,265,726,1360), StyleX.backgroundColor(0xFFD33F), StyleX.border(3,0xad8321) );
  }

  setData( data: any = null ){
    this.addressData = data;

    if( data.addr_id ){
      this.firstName = data.first_name;
      this.lasetName = data.last_name;
      this.phoneNum = data.tel;
      this.email = data.email;
      this.country = data.country;
      this.state = data.province;
      this.city = data.city
      this.addressString = data.addr;
      this.zipCode = data.postal;
    }
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.ADDRESS );
  }

  firstNameChange( str: string ){
    this.firstName = str;
  }

  lasetNameChange( str: string ){
    this.lasetName = str;
  }

  phoneNumChange( str: string ){
    this.phoneNum = str;
  }

  emailChange( str: string ){
    this.email = str;
  }

  countryChange( str: string ){
    this.country = str;
  }

  stateChange( str: string ){
    this.state = str;
  }

  cityChange( str: string ){
    this.city = str;
  }

  addressStringChange( str: string ){
    this.addressString = str;
  }

  zipCodeChange( str: string ){
    this.zipCode = str;
  }

  saveAddress(){
    let isOk: boolean = this.checkRequired();
    if( !isOk ) return;
    Loading.status = 1;
    let ob: Object = {
      type: this.addressData.addr_id ? "update" : "add",
      addr_id: this.addressData.addr_id ? this.addressData.addr_id : "",
      addr: this.addressString,
      tel: this.phoneNum,
      email: this.email,
      first_name: this.firstName,
      last_name: this.lasetName,
      city: this.city,
      province: this.state,
      country: this.country,
      postal: this.zipCode,
      state: 0
    }
    new GameHttp().loadData( "cmd.php?action=address" + GM.interfaceString, this.waitForNewList.bind( this ), "POST", KeyValue.stringify( ob ) );
  }

  waitForNewList( data: any ){
    if( data?.status == "ok" ){
      UserAddress.getData( data.address );
      Trigger.gotoPage( WebPages.ADDRESS );
    }
    else Loading.status = 2;
  }

  checkRequired(): boolean{
    if( !this.firstName ){
      Trigger.popupManager.showAddresInfoMiss( "first name" );
      return false;
    }
    if( !this.lasetName ){
      Trigger.popupManager.showAddresInfoMiss( "last name" );
      return false;
    }
    if( !this.phoneNum ){
      Trigger.popupManager.showAddresInfoMiss( "phone number" );
      return false;
    }
    if( !this.country ){
      Trigger.popupManager.showAddresInfoMiss( "county" );
      return false;
    }
    if( !this.state ){
      Trigger.popupManager.showAddresInfoMiss( "state or province" );
      return false;
    }
    if( !this.city ){
      Trigger.popupManager.showAddresInfoMiss( "city" );
      return false;
    }
    if( !this.addressString ){
      Trigger.popupManager.showAddresInfoMiss( "house number & community" );
      return false;
    }
    if( !this.zipCode ){
      Trigger.popupManager.showAddresInfoMiss( "zip code" );
      return false;
    }
    return true;
  }
}
