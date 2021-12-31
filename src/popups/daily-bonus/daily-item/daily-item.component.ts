import { UIFromParent, Point, BitmapData, SoundManager, StyleX } from '../../../basicUI/basic-ui.module';
import { TextData, DailyBonus, GameHttp, GM, User } from '../../../service/dinomao-game.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-25 16:44:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 16:32:27
 */
import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-daily-item',
  templateUrl: './daily-item.component.html',
  styleUrls: ['./daily-item.component.css']
})
export class DailyItemComponent extends UIFromParent {

  dailyItemBg!: BitmapData;
  coinIcon!: BitmapData;
  greenCheck!: BitmapData;
  clickArea!: BitmapData;
  titleText!: TextData;
  coinText!: TextData;

  @Input() itemData!: any;
  @Input() index: number = -1;
  iNumber: number = 0;
  isToday: boolean = false;

  @Output() dailyEvent: EventEmitter<string> = new EventEmitter<string>();
  
  get showHand(): boolean{
    return this.isToday && !DailyBonus.instance.hasDailyBonus && !this.gettingDailyBonus;
  }

  get showMask(): boolean{
    return ( this.iNumber < DailyBonus.instance.daysRow ) || ( this.isToday && DailyBonus.instance.hasDailyBonus )
  }

  gettingDailyBonus: boolean = false; 

  timeoutId: any;

  get canGetBonus(): boolean{
    return this.isToday && !DailyBonus.instance.hasDailyBonus && !this.gettingDailyBonus;
  }

  constructor() {
    super();
  }

  initUI() {
    this.iNumber = this.index + 1;
    this.isToday = DailyBonus.instance.daysRow == this.iNumber;
    this.dailyItemBg = this.textureData.getTexture( this.showHand ? "bg1" : "bg" );
    let coinLevel: number = DailyBonus.instance.bonusLevel.indexOf( this.itemData ) + 1;
    coinLevel = Math.min( 4, coinLevel );
    this.coinIcon = this.textureData.getTexture( "gold_" + coinLevel, 24, 105 );
    this.greenCheck = this.textureData.getTexture( "Check sign", 14, 54 );
    this.clickArea = this.textureData.getTexture( "blankMask" );

    this.titleText = {"color":0x81665a,"strokeColor":0,"rect":{"h":60,"y":10,"w":204,"x":0},"font":"arial","stroke":0,"size":35,"align":"center"};
    this.coinText = {"color":0xffc20f,"strokeColor":0xff3f3b,"rect":{"h":80,"y":105,"w":204,"x":125},"font":"FRAHV_0","stroke":3,"size":40,"align":"left"};

    this.styles.handImg = StyleX.setItemPosition( 60, 180 );
    this.styles.passedMask = StyleX.combine( StyleX.borderRadius(15), StyleX.setItemRect( 0, 0, 197, 248 ) );
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );

    if( changes.index ){
      var iNumber: number = this.index + 1;
      this.styles.position = StyleX.setItemToPoint( new Point().init( iNumber % 3 * 212 + 48, Math.floor( iNumber / 3 ) * 296 + 234 ) );
    }
  }

  getDailyBonus(){
    let ob = "bonus_type=daily_bonus"
    new GameHttp().loadData( "cmd.php?action=update_user_bonus&" + GM.interfaceString, this.getDailyBonusResult.bind(this), "POST", ob );
    
    this.dailyEvent.emit( "start" );
  }

  getDailyBonusResult( data: any ){
    if( data?.daily_bonus ){
      User.instance.coins = data.coins;
      this.gettingDailyBonus = true;

      this.timeoutId = setTimeout( this.afterCollect.bind( this ), 1000 );
      SoundManager.play( "assets/sound/coins.mp3" );
    }
    else{
      this.dailyEvent.emit( "stop" );
    }
  }

  afterCollect(){
    this.dailyEvent.emit( "ok" );
    DailyBonus.instance.hasDailyBonus = true;
  }

  ngOnDestroy(){
    clearTimeout( this.timeoutId );
  }
}
