/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-01 17:54:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-22 13:52:08
*/
import { Component } from '@angular/core';
import { BitmapData } from 'resize-able-ui';
import { MainPage, Trigger, Loading, GM, ShopType } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends MainPage {
  bankItemDatas!: any[];
  vipItemDatas!: any[];
  ticketItemDatas!: any[];

  shopType: number = 0;
  get showCoinShop(): boolean{
    return this.shopType <= ShopType.COIN;
  }
  get showVipShop(): boolean{
    return this.shopType == ShopType.VIP;
  }
  get showExchangeShop(): boolean{
    return this.shopType == ShopType.EXCHANGE;
  }

  coinBg!: BitmapData;
  vipBg!: BitmapData;
  ticketBg!: BitmapData;

  coinIcon!: BitmapData;
  vipIcon!: BitmapData;
  ticketIcon!: BitmapData;

  coinBtn!: BitmapData;
  vipBtn!: BitmapData;
  ticketBtn!: BitmapData;

  checkLoadingId: any;
  checkLoadingTimeout: number = 6;

  pageSize: number = 0;

  constructor() {
    super();
    this.textureUrl = "assets/bank/bank.json";
  }

  initUI(){
    Loading.status = 2;

    this.coinBg = this.textureData.getTexture( "bg1" );
    this.vipBg = this.textureData.getTexture( "bg2" )
    this.ticketBg = this.textureData.getTexture( "bg3" );

    this.coinIcon = this.textureData.getTexture( "COINS1", 60, 20 );
    this.vipIcon = this.textureData.getTexture( "tag_vip1", 334, 20 );
    this.ticketIcon = this.textureData.getTexture( "tag_exchange1", 530, 16 );
    
    this.coinBtn = this.textureData.getTexture( "COINS2", 61, 21 );
    this.vipBtn = this.textureData.getTexture( "tag_vip2", 285, 21 );
    this.ticketBtn = this.textureData.getTexture( "tag_exchange2", 531, 17 );

    this.bankItemDatas = Trigger.bankData;
    this.vipItemDatas = Trigger.vipData;
    this.ticketItemDatas = GM.ticketGoodslist;
  }

  setData( data: any = null ){
    if( data == "vip" ) this.shopType = ShopType.VIP;
  }

  get initailSize(): number{
    return Math.ceil( ( this.pageHeight - 330 ) / 550 ) * 2;
  }

  switchShop( shopType: number ){
    this.shopType = shopType;
    if( shopType == ShopType.EXCHANGE ){
      this.pageSize = this.initailSize;
      this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
      this.checkLoadingTimeout = 6;
      Loading.status = 1;
    }
  }

  ngOnDestroy(){
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
