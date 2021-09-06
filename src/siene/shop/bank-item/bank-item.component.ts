import { TextData, ListItemComponent } from '../../../service/dinomao-game.module';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bank-item',
  templateUrl: './bank-item.component.html',
  styleUrls: ['./bank-item.component.css']
})
export class BankItemComponent extends ListItemComponent {

  bankItemBg!: BitmapData;
  coinIcon!: BitmapData;
  buyBtn!: BitmapData;
  recommendedIcon!: BitmapData;

  coinText!: TextData;
  coinNumberText: string = "";

  priceText!: TextData;
  priceNumberText!: string;

  constructor() {
    super();
  }

  initUI(){
    this.bankItemBg = this.textureData.getTexture( "bg_coin" );
    this.coinIcon = this.textureData.getTexture( "gold_" + (this.index + 1), 44 - 5 * this.index, 45 - this.index * 5 );
    this.buyBtn = this.textureData.getTexture( "anniu_coin", 478, 42 );

    if( this.index == 0 ) this.recommendedIcon = this.textureData.getTexture( "Recommended", -6, 0 );

    this.coinText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":84,"y":45,"w":238,"x":208},"font":"FRAHV_0","stroke":3,"size":65,"align":"center"};
    this.priceText = {"color":0xffffff,"strokeColor":0x006600,"rect":{"h":88,"y":42,"w":215,"x":478},"font":"FRAHV_0","stroke":3,"size":55,"align":"center"};
    
    
    let items: any[] = this.itemData.items;
    let item = items[0];
    this.coinNumberText = "" + Number(item.after_discount_coins);
    this.priceNumberText = "$" + Number(this.itemData.price);
  }
}
