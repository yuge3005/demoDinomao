/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-05 14:11:34
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-05 14:33:49
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
  // stageInput
  // cityInput


  constructor() { 
    super();
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    super.onWheel( event );
  }

  initUI() {
  }
}
