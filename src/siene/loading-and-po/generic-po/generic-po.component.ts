import { UIData } from './../../../service/gameData/UIData';
import { Rectangle } from './../../../basicUI/geom/rectangle';
import { ModalCommands } from './../../../service/gameUILogic/ModalCommands';
import { BitmapData } from './../../../basicUI/image/bitmap-data';
import { Trigger } from './../../../service/gameUILogic/Trigger';
import { GenericModalComponent } from './../generic-modal/generic-modal.component';
import { trace } from './../../../service/gameUILogic/trace';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 10:45:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-16 13:20:27
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-po',
  templateUrl: './generic-po.component.html',
  styleUrls: ['./generic-po.component.css']
})
export class GenericPoComponent extends GenericModalComponent{

  marginTop: number = 0;
  marginLeft: number = 0;
  
  poBg!: BitmapData;
  prizeBg!: BitmapData;
  coinItem!: BitmapData;
  buyBtn!: BitmapData;


  coinRect!: Rectangle;
  coinNumberText!: string;
  coinTextColor: number = 0;
  coinTextSize: number = 20;
  coinTextFont: string = "Arial";
  coinTextAlign: string = "center";
  coinStroke: number = 0;
  coinStrokeColor: number = 0;

  priceRect!: Rectangle;
  priceNumberText!: string;
  priceTextColor: number = 0;
  priceTextSize: number = 20;
  priceTextFont: string = "Arial";
  priceTextAlign: string = "center";
  priceStroke: number = 0;
  priceStrokeColor: number = 0;

  constructor(public http: HttpClient) {
    super( http );

    let packagePath: string = Trigger.popupPackagePath;
    let fileName: string = packagePath.substr( 0, packagePath.length - 1 );
    let lastDash: number = fileName.lastIndexOf( "/" );
    fileName = fileName.substr( lastDash + 1 );
    this.textureUrl = packagePath + fileName + ".json";
  }

  initUI(){
    this.poBg = this.textureData.getTexture( "bg" );
    this.marginLeft = Math.floor( this.poBg.w * 0.5 );
    this.marginTop = Math.floor( this.poBg.h * 0.5 );

    if( this.textureJson.title ) this.prizeBg = this.buildUI( this.textureJson.title ); //this.textureData.getTexture( "bg_prize", 140, 447 );
    if( this.textureJson.coinIcon ) this.coinItem = this.buildUI( this.textureJson.coinIcon );//this.textureData.getTexture( "icon_coin", 268, 882 );

    this.buyBtn = this.buildUI( this.textureJson.buyBtn );//this.textureData.getTexture( "btn_Price", 180, 1000 );
    this.closeBtn = this.buildUI( this.textureJson.closeBtn );//this.textureData.getTexture( "btn_close", 623, 210 );

    // let product: any = Trigger.popupData.product;

    let price: any = this.textureJson.price;
    let priceRect: any = price.rect;

    this.priceRect = new Rectangle( priceRect.x, priceRect.y, priceRect.w, priceRect.h );
    this.priceNumberText = "$3.99"// + product["price"];//Number(product["items"][0].after_discount_coins);
    if( price.color ) this.priceTextColor = price.color;
    if( price.size ) this.priceTextSize = price.size;
    if( price.font ) this.priceTextFont = price.font;
    if( price.align ) this.priceTextAlign = price.align;
    if( price.stroke ) this.priceStroke = price.stroke;
    if( price.strokeColor ) this.priceStrokeColor = price.strokeColor;

    let coin: any = this.textureJson.coins;
    let coinsRect: any = coin.rect;

    this.coinRect = new Rectangle( coinsRect.x, coinsRect.y, coinsRect.w, coinsRect.h );
    this.coinNumberText = "180"// + product["price"];//Number(product["items"][0].after_discount_coins);
    if( coin.color ) this.coinTextColor = coin.color;
    if( coin.size ) this.coinTextSize = coin.size;
    if( coin.font ) this.coinTextFont = coin.font;
    if( coin.align ) this.coinTextAlign = coin.align;
    if( coin.stroke ) this.coinStroke = coin.stroke;
    if( coin.strokeColor ) this.coinStrokeColor = coin.strokeColor;

    this.loaded = true;
  }

  ngOnDestroy(): void {
    
  }

  buyPo(){
    Trigger.modalCommand( ModalCommands.BUY_PO );
  }
}
