/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:12:46
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-03 14:01:04
 */
import { Component } from '@angular/core';
import { BitmapData, ListItemComponent } from '../../../../basicUI/basic-ui.module';
import { FormartDatas, Trigger, WebPages } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent extends ListItemComponent {

  itemBg!: BitmapData;
  defaultIcon!: BitmapData;
  defaultBtn!: BitmapData;
  editorBtn!: BitmapData;
  deleteBtn!: BitmapData;
  
  constructor() { 
    super();
  }

  initUI(){
    if( this.itemData.addr_id ) this.buildItemUI();
    else this.itemBg = this.textureData.getTexture( "bg4" );
  }

  buildItemUI(){
    this.itemBg = this.textureData.getTexture( "bg3" );

    this.defaultIcon = this.textureData.getTexture( "btn_light", 25, 220 );
    this.defaultBtn = this.textureData.getTexture( "btn_dark", 25, 220 );
    this.editorBtn = this.textureData.getTexture( "icon_book", 495, 207 );
    this.deleteBtn = this.textureData.getTexture( "icon_delete", 605,210 );
  }
}
