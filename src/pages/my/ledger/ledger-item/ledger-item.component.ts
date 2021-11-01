/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 10:51:28
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-01 11:53:10
 */
import { Component } from '@angular/core';
import { BitmapData, ListItemComponent } from '../../../../basicUI/basic-ui.module';
import { FormartDatas, Trigger, WebPages } from '../../../../service/dinomao-game.module';

@Component({
  selector: 'app-ledger-item',
  templateUrl: './ledger-item.component.html',
  styleUrls: ['./ledger-item.component.css']
})
export class LedgerItemComponent extends ListItemComponent {

  itemBg!: BitmapData;
  itemCreatedTime!: Date;
  
  constructor() { 
    super();
  }

  initUI(){
    console.log( this.itemData )
    this.itemBg = this.textureData.getTexture( "di" );
    // console.log( this.itemData )
    this.itemCreatedTime = FormartDatas.transformUTCStringToDate( this.itemData.created_at );

    // console.log( this.itemCreatedTime )
  }
}
