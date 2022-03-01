/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-25 14:53:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:30:46
*/
import { Component } from '@angular/core';
import { Application, StyleX } from '../../basicUI/basic-ui.module';
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

  dailyStyle: Object = {};

  constructor() {
    super();
    this.dailyList = DailyBonus.instance.bonusList;
    let dayNum: number = DailyBonus.instance.daysRow;
    this.dayNumberStr = 'continued for ' + dayNum + ' day' + ( dayNum > 1 ? "s" : "" );
  }

  initUI(){
    super.setPopupBg( "bg0" );

    this.ui.closeBtn = this.buildUI( this.textureJson.closeBtn );
    this.dayRowText = this.textureJson.dayRow;

    let matrix: string;
    if( Application.settings.stageHeight < 1332 ){
      let newScale: number = Application.settings.stageHeight / 1332;
      matrix = `matrix(${newScale},0,0,${newScale},0,0)`;
    }
    else matrix = "matrix(1,0,0,1,0,0)";

    this.dailyStyle = StyleX.combine( this.styles.popupOffset, {'transform': matrix}, StyleX.setSize( 722, 1332 ) );
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
