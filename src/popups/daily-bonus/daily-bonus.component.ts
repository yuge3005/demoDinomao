/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-25 14:53:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-21 13:06:18
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericModalComponent, trace, DailyBonus, TextData } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-daily-bonus',
  templateUrl: './daily-bonus.component.html'
})
export class DailyBonusComponent extends GenericModalComponent{

  dayRowText!: TextData;
  dayNumberStr: string = "";
  dailyList: any[];

  private isCollecting: boolean = false;

  constructor(public http: HttpClient) {
    super( http );
    this.dailyList = DailyBonus.instance.bonusList;
    let dayNum: number = DailyBonus.instance.daysRow;
    this.dayNumberStr = 'continued for ' + dayNum + ' day' + ( dayNum > 1 ? "s" : "" );
  }

  initUI(){
    super.setPopupBg( "bg0" );

    this.closeBtn = this.buildUI( this.textureJson.closeBtn );
    this.dayRowText = this.textureJson.dayRow;
  }

  dailyItemEventListener( message: string ){
    switch( message ){
      case "start": this.isCollecting = true;
        break;
      case "stop": this.isCollecting = false;
        break;
      case "ok": this.isCollecting = false;
        this.closePo();
        break;
      default:
        trace.log( "wrong status" );
        break;
    }
  }

  closePo(){
    if( this.isCollecting ) return;
    super.closePo();
  }
}
