/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-09 10:41:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-08 10:29:08
*/
import { Component } from '@angular/core';
import { BitmapData, Rectangle, ListItem } from 'resize-able-ui';
import { TextData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent extends ListItem {

  ticketItemBg!: BitmapData;
  infoIcon!: BitmapData;
  buyBtn!: BitmapData;
  ticketIcon!: BitmapData;

  priceText!: TextData;
  tipRect: Rectangle = new Rectangle().init( 10, 385, 240, 50 );

  get offsetX(): number{
    return (this.index & 1) ? 408 : 40;
  }

  get offsetY(): number{
    return ( (this.index & 1) ? 60 : 0 ) + Math.floor( this.index * 0.5 ) * 550;
  }

  constructor() {
    super();
  }

  initUI(){
    this.ticketItemBg = this.textureData.getTexture( "Photo frame" );
    this.infoIcon = this.textureData.getTexture( "btn_info", 212, 302 );
    this.buyBtn = this.textureData.getTexture( "anniu_ticket", 25, 440 );
    this.ticketIcon = this.textureData.getTexture( "icon_ticket", 58, 460 );

    this.priceText = {"color":0xFFFFFF,"strokeColor":0x01678f,"rect":{"h":50,"y":455,"w":100,"x":120},"font":"ariblk","stroke":3,"size":36,"align":"left"};
  }

  onImgload(){
    this.itemData.imgLoaded = true;
  }
}
