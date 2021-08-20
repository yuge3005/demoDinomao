import { trace, ModalCommands, TextData, Trigger, GenericModalComponent } from './../../service/dinomao-game.module';
import { BitmapData } from './../../basicUI/basic-ui.module';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-16 11:54:28
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-19 18:03:02
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-vip-pass',
  templateUrl: './vip-pass.component.html',
  styleUrls: ['./vip-pass.component.css']
})
export class VipPassComponent extends GenericModalComponent {

  tokens!: BitmapData;
  free!: BitmapData;
  exchange!: BitmapData;
  buyBtn!: BitmapData;

  priceText!: TextData;
  coinsText!: TextData;
  daysText!: TextData;
  vipPrice: number = 0;
  vipDays: number = 0;
  vipCoins: number = 0;

  hasCoinText: boolean = false;
  hasDaysText: boolean = false;

  product!: any;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg" );

    this.popupBg = this.textureData.getTexture( "bg" );
    this.closeBtn = this.buildUI( this.textureJson.closeBtn );
    this.buyBtn = this.buildUI( this.textureJson.vip );
    if( this.textureJson.title ) this.tokens = this.buildUI( this.textureJson.title );
    if( this.textureJson.free ) this.free = this.buildUI( this.textureJson.free );
    if( this.textureJson.exchange ) this.exchange = this.buildUI( this.textureJson.exchange );

    this.priceText = this.textureJson.price;

    if( this.textureJson.days ){
      this.daysText = this.textureJson.days;
      this.hasCoinText = true;
    }
    if( this.textureJson.coins ){
      this.coinsText = this.textureJson.coins;
      this.hasDaysText = true;
    }
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
    if( days )this.vipDays = days.subscription_days;
    if( subCoins )this.vipCoins = coinsItem.after_discount_coins + subCoins.subscription_coins;
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
