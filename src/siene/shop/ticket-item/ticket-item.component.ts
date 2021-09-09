/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-09 10:41:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-09 11:19:39
*/
import { Component } from '@angular/core';
import { BitmapData } from '../../../basicUI/basic-ui.module';
import { ListItemComponent, TextData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent extends ListItemComponent {

  ticketItemBg!: BitmapData;
  infoIcon!: BitmapData;
  buyBtn!: BitmapData;

  tipText!: TextData;
  tipStringText: string = "";

  ticketText!: TextData;
  ticketNumberText!: string;

  constructor() {
    super();
  }

  initUI(){
    this.ticketItemBg = this.textureData.getTexture( "bg_coin" );
    this.infoIcon = this.textureData.getTexture( "gold_" + (this.index + 1), 44 - 5 * this.index, 45 - this.index * 5 );
    this.buyBtn = this.textureData.getTexture( "anniu_coin", 478, 42 );

    this.tipText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":84,"y":45,"w":238,"x":208},"font":"FRAHV_0","stroke":3,"size":65,"align":"center"};
    this.ticketText = {"color":0xffffff,"strokeColor":0x006600,"rect":{"h":88,"y":42,"w":215,"x":478},"font":"FRAHV_0","stroke":3,"size":55,"align":"center"};
    
    let items: any[] = this.itemData.items;
    let item = items[0];
    // this.coinNumberText = "" + Number(item.after_discount_coins);
    // this.priceNumberText = "$" + Number(this.itemData.price);
  }
}
