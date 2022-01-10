/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:12:46
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:23:57
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem, KeyValue } from 'resize-able-ui';
import { GameHttp, Loading, GM, User, UserAddress, Trigger, WebPages } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent extends ListItem {

  itemBg!: BitmapData;
  defaultIcon!: BitmapData;
  defaultBtn!: BitmapData;
  editorBtn!: BitmapData;
  deleteBtn!: BitmapData;

  mainString: string = "";
  
  constructor() { 
    super();
  }

  initUI(){
    if( this.itemData.addr_id ) this.buildItemUI();
    else this.buildEmptyUI();
  }

  buildItemUI(){
    this.itemBg = this.textureData.getTexture( "bg3" );

    this.defaultIcon = this.textureData.getTexture( "btn_light", 25, 220 );
    this.defaultBtn = this.textureData.getTexture( "btn_dark", 25, 220 );
    this.editorBtn = this.textureData.getTexture( "icon_book", 495, 207 );
    this.deleteBtn = this.textureData.getTexture( "icon_delete", 605,210 );

    this.mainString = this.itemData.addr + "," + this.itemData.city + "," + this.itemData.province + "," + this.itemData.country + "," + this.itemData.postal;
  }
  
  buildEmptyUI(){
    this.editorBtn = this.textureData.getTexture( "bg4" );
  }

  changeDefault(){
    Loading.status = 1;
    let ob: Object = { type: "update_address_state", addr_id: this.itemData.addr_id, user_id: User.instance.id };
    new GameHttp().loadData( "cmd.php?action=address&" + GM.interfaceString, this.waitForNewList.bind( this ), "POST", KeyValue.stringify( ob ) );
  }

  waitForNewList( data: any ){
    UserAddress.getData( data.address );
  }

  deleteItem(){
    Trigger.popupManager.showDeleteAddress( this.confirmDelete.bind( this ) );
  }

  confirmDelete(){
    Loading.status = 1;
    let ob: Object = { type: "delete", addr_id: this.itemData.addr_id };
    new GameHttp().loadData( "cmd.php?action=address&" + GM.interfaceString, this.waitForNewList.bind( this ), "POST", KeyValue.stringify( ob ) );
  }

  editAddress(){
    Trigger.gotoPage( WebPages.EDIT_ADDRESS, this.itemData );
  }
}
