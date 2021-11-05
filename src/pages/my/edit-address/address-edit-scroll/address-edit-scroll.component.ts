/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-05 14:11:34
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-05 15:39:38
 */
import { Component, Input } from '@angular/core';
import { ScrollListComponent, BitmapData, Rectangle, HttpRequest } from '../../../../basicUI/basic-ui.module';
import { Trigger, WebPages, User, GM, TextData } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-address-edit-scroll',
  templateUrl: './address-edit-scroll.component.html',
  styleUrls: ['./address-edit-scroll.component.css']
})
export class AddressEditScrollComponent extends ScrollListComponent {

  @Input() textureJson: any;

  minY(): number{
    return - 1100 + this.listHeight;
  }

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
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    super.onWheel( event );
  }

  initUI() {
    this.firstNameInput = this.textureData.getTexture( "bg0", 10, 15 );
    this.lasetNameInput = this.textureData.getTexture( "bg0", 385, 15 );
    this.phoneNumInput = this.textureData.getTexture( "bg1", 10, 115 );
    this.emailInput = this.textureData.getTexture( "bg1", 10, 215 );
    this.countryInput = this.textureData.getTexture( "bg1", 10, 550 );
    this.stateInput = this.textureData.getTexture( "bg1", 10, 650 );
    this.cityInput = this.textureData.getTexture( "bg1", 10, 750 );
    this.addressStringInput = this.textureData.getTexture( "bg2", 10, 375 );
    this.zipCodeInput = this.textureData.getTexture( "bg1", 10, 850 );
  }

  firstNameChange( str: string ){}
  lasetNameChange( str: string ){}
  phoneNumChange( str: string ){}
  emailChange( str: string ){}
  countryChange( str: string ){}
  stateChange( str: string ){}
  cityChange( str: string ){}
  addressStringChange( str: string ){}
  zipCodeChange( str: string ){}
}
