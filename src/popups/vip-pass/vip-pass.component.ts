import { ModalCommands } from './../../service/gameUILogic/ModalCommands';
import { trace } from './../../service/gameUILogic/trace';
import { TextData } from './../../service/dinomao-game.module';
import { BitmapData } from './../../basicUI/basic-ui.module';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-16 11:54:28
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-29 15:18:54
 */
import { Component } from '@angular/core';
import { GenericModalComponent } from 'src/siene/loading-and-po/popup-layer/generic-modal.component';
import { Trigger } from 'src/service/gameUILogic/Trigger';

@Component({
  selector: 'app-vip-pass',
  templateUrl: './vip-pass.component.html',
  styleUrls: ['./vip-pass.component.css']
})
export class VipPassComponent extends GenericModalComponent {

  tokens!: BitmapData;
  free!: BitmapData;
  exchange!: BitmapData;
  shipment!: BitmapData;
  premium!: BitmapData;
  buyBtn!: BitmapData;

  priceText!: TextData;
  coinsText!: TextData;
  daysText!: TextData;
  vipPrice: number = 0;
  vipDays: number = 0;
  vipCoins: number = 0;

  product!: any;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg" );

    this.popupBg = this.textureData.getTexture( "bg" );
    this.tokens = this.textureData.getTexture( "tokens", 72, 240 );
    this.free = this.textureData.getTexture( "free", 390, 242 );
    this.exchange = this.textureData.getTexture( "exchange", 8, 592 );
    this.shipment = this.textureData.getTexture( "shipment", 202, 610 );
    this.premium = this.textureData.getTexture( "premium", 464, 554 );
    this.closeBtn = this.textureData.getTexture( "btn_return", 24, 12 );
    this.buyBtn = this.textureData.getTexture( "btn_get vip", 180, 1065 );

    this.priceText = this.textureJson.price;

    if( this.textureJson.days ) this.daysText = this.textureJson.days;
    if( this.textureJson.coins ) this.coinsText = this.textureJson.coins;

    let products: any = Trigger.popupData.products;
    if( !products || !products.length ) trace.log( "wrong po data" );
    let product: any = products[0]
    if( !product ) trace.log( "wrong po data" );
    let items: any[] = product.items;
    this.product = product;

    let coinsItem: any = this.getItemByType( "coins", items );
    let days: any = this.getItemByType( "subscription_days", items );
    let subCoins: any = this.getItemByType( "subscription_coins", items );
    this.vipPrice = product.price;
    this.vipDays = days.subscription_days;
    this.vipCoins = coinsItem.after_discount_coins + subCoins.subscription_coins;
  }

  getItemByType( typeName: string, items: any[] ): any{
    for( let i: number = 0; i < items.length; i++ ){
      if( items[i].type == typeName ) return items[i];
    }
    return null;
  }

  buyVip(){
    Trigger.modalCommand( ModalCommands.BUY_VIP, this.product );
  }
}
