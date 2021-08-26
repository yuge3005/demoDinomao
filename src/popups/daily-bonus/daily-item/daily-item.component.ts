import { UIFromParent, Point, BitmapData } from './../../../basicUI/basic-ui.module';
import { TextData, DailyBonus } from './../../../service/dinomao-game.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-25 16:44:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-26 11:46:21
 */
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-daily-item',
  templateUrl: './daily-item.component.html',
  styleUrls: ['./daily-item.component.css']
})
export class DailyItemComponent extends UIFromParent {

  dailyItemBg!: BitmapData;
  coinIcon!: BitmapData;
  greenCheck!: BitmapData;
  titleText!: TextData;
  coinText!: TextData;
  position: Point = new Point;

  @Input() itemData!: any;
  @Input() index: number = -1;
  iNumber: number = 0;
  isToday: boolean = false;
  
  get showHand(): boolean{
    return this.isToday && !DailyBonus.instance.hasDailyBonus;
  }

  get showMask(): boolean{
    return ( this.iNumber < DailyBonus.instance.daysRow ) || ( this.isToday && DailyBonus.instance.hasDailyBonus )
  }

  gettingDailyBonus: boolean = false; 

  constructor() {
    super();
  }

  initUI() {
    this.iNumber = this.index + 1;
    this.isToday = DailyBonus.instance.daysRow == this.iNumber;
    this.dailyItemBg = this.textureData.getTexture( this.isToday ? "bg1" : "bg" );
    let coinLevel: number = DailyBonus.instance.bonusLevel.indexOf( this.itemData ) + 1;
    coinLevel = Math.min( 4, coinLevel );
    this.coinIcon = this.textureData.getTexture( "gold_" + coinLevel, 24, 105 );
    this.greenCheck = this.textureData.getTexture( "Check sign", 14, 54 );

    this.titleText = {"color":0x81665a,"strokeColor":0,"rect":{"h":60,"y":10,"w":204,"x":0},"font":"arial","stroke":0,"size":35,"align":"center"};
    this.coinText = {"color":0xffc20f,"strokeColor":0xff3f3b,"rect":{"h":80,"y":105,"w":204,"x":125},"font":"FRAHV_0","stroke":3,"size":40,"align":"left"};
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );

    if( changes.index ){
      var iNumber: number = this.index + 1;
      this.position = new Point().init( iNumber % 3 * 212 + 48, Math.floor( iNumber / 3 ) * 296 + 234 );
    }
  }

  getDailyBonus(){
    console.log(444)
  }
}
