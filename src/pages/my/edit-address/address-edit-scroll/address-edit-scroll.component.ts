/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-05 14:11:34
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-08 12:16:50
 */
import { Component, Input } from '@angular/core';
import { ScrollList, BitmapData, Rectangle } from '../../../../basicUI/basic-ui.module';
import { Trigger, AddressData, WebPages } from '../../../../service/dinomao-game.module';

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

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    super.onWheel( event );
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
    this.firstName = str;
  }

  saveAddress(){
    
  }
}
