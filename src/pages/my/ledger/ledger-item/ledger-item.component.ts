/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-01 10:51:28
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 09:33:56
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
    let tempData: Date = new Date(Number(this.itemData.created_at));
    let timeStr: string = tempData.getFullYear() + "-" + this.byTen( tempData.getMonth() + 1 ) + "-" + this.byTen( tempData.getDate() )
      + " " + this.byTen( tempData.getHours() ) + ":" + this.byTen( tempData.getMinutes() ) + ":" + this.byTen( tempData.getSeconds() );
    this.itemCreatedTime = FormartDatas.transformUTCStringToDate( timeStr );
    let strArr: string[] = this.itemCreatedTime.toDateString().split( " " );
    this.line1Str = strArr[2] + "," + strArr[1] + "," + strArr[3];
    let timeSecStamp: number = Math.floor( this.itemCreatedTime.getTime() / 1000 );
    timeSecStamp %= 3600*24;
    this.line2Str = this.itemCreatedTime.toTimeString();
    this.line2Str = this.line2Str.substr( 0, this.line2Str.indexOf( " " ) );

    this.noteStr = this.itemData.note;
    this.changeStr = ( this.itemData.type == "add" ? "+" : "-" ) + this.itemData.num;

    if( Number(this.changeStr) <= 0 ) this.colorClass = "msColor";
  }

  byTen( num: number ): string{
    return num < 10 ? "0" + num : "" + num;
  }
}
