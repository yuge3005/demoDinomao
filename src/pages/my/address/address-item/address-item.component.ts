/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:12:46
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 13:58:41
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
  
  constructor() { 
    super();
  }

  initUI(){
    if( this.itemData.addr_id ) this.buildItemUI();
    else this.itemBg = this.textureData.getTexture( "bg4" );
  }

  buildItemUI(){
    this.itemBg = this.textureData.getTexture( "bg3" );
  }
}
