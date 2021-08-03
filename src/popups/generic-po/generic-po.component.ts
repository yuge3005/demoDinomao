import { TextData, trace, Trigger, ModalCommands, GenericModalComponent } from '../../service/dinomao-game.module';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 10:45:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-03 17:41:34
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-po',
  templateUrl: './generic-po.component.html',
  styleUrls: ['./generic-po.component.css']
})
export class GenericPoComponent extends GenericModalComponent{

  prizeBg!: BitmapData;
  coinItem!: BitmapData;
  buyBtn!: BitmapData;

  coinText!: TextData;
  coinNumberText!: string;

  priceText!: TextData;
  priceNumberText!: string;

  product!: any;

  constructor(public http: HttpClient) {
    super( http );
  }

  initUI(){
    super.setPopupBg( "bg" );

    if( this.textureJson.title ) this.prizeBg = this.buildUI( this.textureJson.title );
    if( this.textureJson.coinIcon ) this.coinItem = this.buildUI( this.textureJson.coinIcon );

    this.buyBtn = this.buildUI( this.textureJson.buyBtn );
    this.closeBtn = this.buildUI( this.textureJson.closeBtn );

    let products: any = Trigger.popupData.products;
    if( !products || !products.length ) trace.log( "wrong po data" );
    let product: any = products[0]
    if( !product ) trace.log( "wrong po data" );
    let items: any[] = product.items;
    if( !items || !items.length ) trace.log( "wrong po data" );
    let item = items[0];
    this.product = product;

    this.priceText = this.textureJson.price;
    this.priceNumberText = "$" + Number(product.price);

    this.coinText = this.textureJson.coins;
    this.coinNumberText = "" + Number(item.after_discount_coins);
  }

  ngOnDestroy(): void {
    
  }

  buyPo(){
    Trigger.modalCommand( ModalCommands.BUY_PO, this.product );
  }
}
