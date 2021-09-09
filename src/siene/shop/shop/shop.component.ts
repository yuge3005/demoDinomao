/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-01 17:54:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-09 15:19:34
*/
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UIComponent, BitmapData } from '../../../basicUI/basic-ui.module';
import { MainPage, Trigger, Loading, GM } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends UIComponent implements MainPage, OnDestroy {
  pageHeight: number = 0;
  
  bankItemDatas!: any[];
  ticketItemDatas!: any[];

  showCoinShop: boolean = true;

  coinBg!: BitmapData;
  coinIcon!: BitmapData;
  ticketBtn!: BitmapData;
  ticketBg!: BitmapData;
  coinBtn!: BitmapData;
  ticketIcon!: BitmapData;

  vipIcon!: BitmapData;

  checkLoadingId: any;
  checkLoadingTimeout: number = 6;

  pageSize: number = 0;

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
    this.ticketItemDatas = GM.ticketGoodslist;
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: any ){
  }

  get initailSize(): number{
    return Math.ceil( ( this.pageHeight - 330 ) / 550 ) * 2;
  }

  switchShop( isCoin: boolean ){
    this.showCoinShop = !isCoin;
    if( isCoin ){
      this.pageSize = this.initailSize;
      this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
      this.checkLoadingTimeout = 6;
      Loading.status = 1;
    }
  }

  showVip(){
    Trigger.openSubscription();
  }

  OnDestroy(){
    clearTimeout( this.checkLoadingId );
  }

  checkLoading(){
    console.log("checkLoading")
    if(!this.ticketItemDatas.length){
      this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
      return;
    }
    this.checkLoadingTimeout --;
    if( this.checkLoadingTimeout <= 0 ){
      this.checkLoadingResult();
      return;
    }
    for( var i: number = 0; i < this.pageSize && i < this.ticketItemDatas.length; i++ ){
      console.log(this.ticketItemDatas[i].imgLoaded)
      if( !this.ticketItemDatas[i].imgLoaded ){
        this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
        return;
      }
    }
    this.checkLoadingResult();
  }

  checkLoadingResult(){
    Loading.status = 2;
    this.pageSize = this.ticketItemDatas.length;
  }
}
