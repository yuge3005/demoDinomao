/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 10:51:28
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-10 16:49:33
 */
import { Component } from '@angular/core';
import { BitmapData, ListItem } from 'resize-able-ui/lib/basic-ui.module';
import { FormartDatas, Trigger, WebPages } from '../../../../service/dinomao-game.module';

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

  colorClass: string = "addColor";
  
  constructor() { 
    super();
  }

  initUI(){
    this.itemBg = this.textureData.getTexture( "di" );
    this.itemCreatedTime = FormartDatas.getUTCDateByTimeStamp( Number( this.itemData.created_at ) );
    let strArr: string[] = this.itemCreatedTime.toDateString().split( " " );
    this.line1Str = strArr[2] + "," + strArr[1] + "," + strArr[3];
    this.line2Str = FormartDatas.toFormatString( this.itemCreatedTime, "HH:MM:SS" );

    this.noteStr = this.itemData.note;
    this.changeStr = ( this.itemData.type == "add" ? "+" : "-" ) + this.itemData.num;

    if( Number(this.changeStr) <= 0 ) this.colorClass = "msColor";
  }
}
