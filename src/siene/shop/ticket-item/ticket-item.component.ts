/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-09 10:41:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-09 12:02:55
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

    this.tipText = {"color":0,"strokeColor":0x0000ff,"rect":{"h":50,"y":385,"w":240,"x":10},"font":"arail","stroke":0,"size":25,"align":"center"};
    this.ticketText = {"color":0xffffff,"strokeColor":0x006600,"rect":{"h":88,"y":42,"w":215,"x":478},"font":"FRAHV_0","stroke":3,"size":55,"align":"center"};
  }
}
