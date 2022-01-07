/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-05 14:11:34
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 11:13:41
 */
import { Component, Input } from '@angular/core';
import { ScrollList, BitmapData, Rectangle, KeyValue, StyleX } from '../../../../basicUI/basic-ui.module';
import { Trigger, AddressData, WebPages, Loading, GameHttp, GM, UserAddress } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-address-edit-scroll',
  templateUrl: './address-edit-scroll.component.html',
  styleUrls: ['./address-edit-scroll.component.css']
})
export class AddressEditScrollComponent extends ScrollList {

  @Input() textureJson: any;

  minY(): number{
    return - 1400 + this.listHeight;
  }

  backBtn!: BitmapData;

  firstNameInput!: BitmapData;
  lasetNameInput!: BitmapData;
  phoneNumInput!: BitmapData;
  emailInput!: BitmapData;
  countryInput!: BitmapData;
  stateInput!: BitmapData;
  cityInput!: BitmapData;
  addressStringInput!: BitmapData;
  zipCodeInput!: BitmapData;

  saveBtn!: BitmapData;

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

  addressData!: AddressData;

  constructor() { 
    super();
  }

  initUI() {
    this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );

    this.firstNameInput = this.textureData.getTexture( "bg0", 10, 15 );
    this.lasetNameInput = this.textureData.getTexture( "bg0", 385, 15 );
    this.phoneNumInput = this.textureData.getTexture( "bg1", 10, 115 );
    this.emailInput = this.textureData.getTexture( "bg1", 10, 215 );
    this.countryInput = this.textureData.getTexture( "bg1", 10, 550 );
    this.stateInput = this.textureData.getTexture( "bg1", 10, 650 );
    this.cityInput = this.textureData.getTexture( "bg1", 10, 750 );
    this.addressStringInput = this.textureData.getTexture( "bg2", 10, 375 );
    this.zipCodeInput = this.textureData.getTexture( "bg1", 10, 850 );

    this.saveBtn = this.textureData.getTexture( "btn_save", 200, 955 );

    let addrObj: AddressData = this.addressData = this.listData[0];
    if( addrObj.addr_id ){
      this.firstName = addrObj.first_name;
      this.lasetName = addrObj.last_name;
      this.phoneNum = addrObj.tel;
      this.email = addrObj.email;
      this.country = addrObj.country;
      this.state = addrObj.province;
      this.city = addrObj.city
      this.addressString = addrObj.addr;
      this.zipCode = addrObj.postal;
    }

    this.styles.addressList = StyleX.combine( StyleX.borderRadius(28), StyleX.setItemRect(10,265,726,1360), StyleX.backgroundColor(0xFFD33F) );
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
