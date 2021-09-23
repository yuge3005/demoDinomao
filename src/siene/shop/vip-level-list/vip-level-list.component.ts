/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-23 15:22:50
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-09-23 18:02:28
*/
import { Component, Input } from '@angular/core';
import { UIFromParent, BitmapData } from '../../../basicUI/basic-ui.module';
import { TextData, Trigger } from './../../../service/dinomao-game.module';

@Component({
  selector: 'app-vip-level-list',
  templateUrl: './vip-level-list.component.html',
  styleUrls: ['./vip-level-list.component.css']
})
export class VipLevelListComponent extends UIFromParent {

  @Input() listData!: any[];

  lightImg!: BitmapData;
  vip1!: BitmapData;
  vip2!: BitmapData;
  vip3!: BitmapData;

  textBg!: BitmapData;
  crown!: BitmapData;
  hand!: BitmapData;

  buyBtn!: BitmapData;

  titleText!: TextData; 
  tipText!: TextData;
  priceText!: TextData;
  titleString: string = "";
  tipString: string = "";
  priceString: string = "";

  products?: any[];

  vipLevel: number = 0;
  get currentItem(): any{
    if( !this.products ) return null;
    let product: any = this.products[ this.vipLevel ];
    let items: any = product.items;
    return items;
  }

  constructor() {
    super();
  }

  initUI(){
    this.lightImg = this.textureData.getTexture( "guang", -50, 22 );
    this.vip1 = this.textureData.getTexture( "vip1", 10, 80 );
    this.vip2 = this.textureData.getTexture( "vip2", 255, 80 );
    this.vip3 = this.textureData.getTexture( "vip3", 500, 80 );

    this.textBg = this.textureData.getTexture( "bg0", 0, 240 );
    this.crown = this.textureData.getTexture( "crown", 308, 0 );
    this.hand = this.textureData.getTexture( "hand", 420, 157 );

    this.buyBtn = this.textureData.getTexture( "btn_subscribe", 188, 1050 );

    this.titleText = {rect:{x:45,y:265,w:640,h:65},color:0xFFFFFF,size:60,font:"arialbk",align:"left",stroke:3,strokeColor:0x6d98e7};
    this.tipText = {rect:{x:45,y:250,w:640,h:65},color:0xFFFFFF,size:45,font:"arialbk",align:"left",stroke:3,strokeColor:0x6d98e7};
    this.priceText = {rect:{x:45,y:910,w:646,h:102},color:0xFFE635,size:90,font:"FRAHV_0",align:"center",stroke:6,strokeColor:0xAC1200,bold:true};
    this.products = Trigger.vipData;
    this.switchVip( this.vipLevel );
  }

  switchVip( vipLevel: number ){
    this.vipLevel = vipLevel;
    if( !this.products ) return;
    this.priceString = "$ " + this.products[this.vipLevel].price + "/mo";
    for( let i: number = 0; i < this.currentItem.length; i++ ){
      if( this.currentItem[i].type == "item_subscription_name" ){
        this.titleString = "Benefits of " + this.currentItem[i].item_subscription_name + " VIP：";
      }
      if( this.currentItem[i].type == "item_subscription_des" ){
        this.tipString = this.currentItem[i].item_subscription_des;
        this.tipString = this.tipString.replace( /\<p\>/g, "" );
        this.tipString = this.tipString.replace( /\<\/p\>/g, "" );
        this.tipString = this.tipString.replace( /\*/g, "<br/>" );
        document.getElementsByClassName( "tipText" )[0].innerHTML = this.tipString;
      }
    }
  }

  buyVip(){
    
  }
}
