/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-07 14:07:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-06 15:14:10
 */
import { TextData } from '../../../service/dinomao-game.module';
import { ListItem, StyleX } from '../../../basicUI/basic-ui.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html'
})
export class BankItemComponent extends ListItem {

  coinText!: TextData;
  coinNumberText: string = "";

  priceText!: TextData;
  priceNumberText: string = "";

  constructor() {
    super();
  }

  initUI(){
    this.ui.bankItemBg = this.textureData.getTexture( "bg_coin" );
    this.ui.coinIcon = this.textureData.getTexture( "gold_" + (this.index + 1), 44 - 5 * this.index, 45 - this.index * 5 );
    this.ui.buyBtn = this.textureData.getTexture( "anniu_coin", 478, 42 );

    if( this.index == 0 ) this.ui.recommendedIcon = this.textureData.getTexture( "Recommended", -6, 0 );

    this.coinText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":84,"y":45,"w":238,"x":208},"font":"FRAHV_0","stroke":3,"size":65,"align":"center"};
    this.priceText = {"color":0xffffff,"strokeColor":0x006600,"rect":{"h":88,"y":42,"w":215,"x":478},"font":"FRAHV_0","stroke":3,"size":55,"align":"center"};

    let items: any[] = this.itemData.items;
    let item = items[0];
    this.coinNumberText = "" + Number(item.after_discount_coins);
    this.priceNumberText = "$" + Number(this.itemData.price);

    this.styles.bankItem = StyleX.combine( StyleX.setItemPosition(11,this.index*185), StyleX.buttonMode(), StyleX.textShadow(0,4,2,0x666666) );
  }
}
