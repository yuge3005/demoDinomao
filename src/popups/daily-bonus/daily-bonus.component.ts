import { trace } from '../../service/gameUILogic/trace';
import { DailyBonus } from '../../service/user/DailyBonus';
import { TextData } from '../../service/gameData/TextData';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-25 14:53:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-16 17:58:51
*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericModalComponent } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-daily-bonus',
  templateUrl: './daily-bonus.component.html',
  styleUrls: ['./daily-bonus.component.css']
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
