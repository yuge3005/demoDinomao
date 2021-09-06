/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-01 17:54:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-06 10:22:42
*/
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UIComponent, BitmapData } from './../../basicUI/basic-ui.module';
import { MainPage, Trigger, Loading } from './../../service/dinomao-game.module';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends UIComponent implements MainPage, OnDestroy {
  pageHeight: number = 0;
  emptyCallback: Function | null = null;
  
  bankItemDatas!: any[];

  showCoinShop: boolean = true;

  coinBg!: BitmapData;
  coinIcon!: BitmapData;
  ticketBtn!: BitmapData;
  ticketBg!: BitmapData;
  coinBtn!: BitmapData;
  ticketIcon!: BitmapData;

  vipIcon!: BitmapData;

  private _scrollY: number = 0;
  get scrollY(): number{
    return this._scrollY;
  }
  set scrollY( value: number ){
    this._scrollY = value;
  }

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/bank/bank.json";
  }

  initUI(){
    Loading.status = 2;

    this.coinBg = this.textureData.getTexture( "bg1" );
    this.coinIcon = this.textureData.getTexture( "COINS1", 88, 0 );
    this.ticketBtn = this.textureData.getTexture( "TICKETS1", 380, 0 );
    this.ticketBg = this.textureData.getTexture( "bg2" );
    this.coinBtn = this.textureData.getTexture( "COINS2", 88, 0 );
    this.ticketIcon = this.textureData.getTexture( "TICKETS2", 374, 0 );

    this.vipIcon = this.textureData.getTexture( "vip  pass", 10, 71 );

    this.bankItemDatas = Trigger.bankData;
  }

  ngOnDestroy(): void {
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: any ){
  }

  switchShop( isCoin: boolean ){
    this.showCoinShop = !isCoin;
  }

  onBankItemClick( item: any ){
    alert( "buy" )
  }
}
