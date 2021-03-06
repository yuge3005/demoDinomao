/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 10:51:28
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 10:59:05
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem, StringTransform, StyleX } from 'resize-able-ui';

@Component({
  selector: 'app-ledger-item',
  templateUrl: './ledger-item.component.html',
  styleUrls: ['./ledger-item.component.css']
})
export class LedgerItemComponent extends ListItem {

  itemBg!: BitmapData;
  itemCreatedTime!: Date;

  line1Str: string = "";
  line2Str: string = "";
  noteStr: string = "";
  changeStr: string = "";
  
  constructor() { 
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "di" );
    this.itemCreatedTime = StringTransform.getUTCDateByTimeStamp( Number( this.itemData.created_at ) );
    let strArr: string[] = this.itemCreatedTime.toDateString().split( " " );
    this.line1Str = strArr[2] + "," + strArr[1] + "," + strArr[3];
    this.line2Str = StringTransform.dateToFormatString( this.itemCreatedTime, "HH:MM:SS" );

    this.noteStr = this.itemData.note;
    this.changeStr = ( this.itemData.type == "add" ? "+" : "-" ) + this.itemData.num;

    if( Number(this.changeStr) <= 0 ) this.styles.colorClass = StyleX.textStroke( 2, 0x004e97 );
    else this.styles.colorClass = StyleX.textStroke( 2, 0xC5641D );
  }
}
