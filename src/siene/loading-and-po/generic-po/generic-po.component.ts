import { TextData } from './../../../service/gameData/TextData';
import { Rectangle } from './../../../basicUI/geom/rectangle';
import { ModalCommands } from './../../../service/gameUILogic/ModalCommands';
import { BitmapData } from './../../../basicUI/image/bitmap-data';
import { Trigger } from './../../../service/gameUILogic/Trigger';
import { GenericModalComponent } from '../popup-layer/generic-modal.component';
import { HttpClient } from '@angular/common/http';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 10:45:10
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-20 09:50:14
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
  coinRect!: Rectangle;
  coinNumberText!: string;
  coinTextColor: number = 0;
  coinTextSize: number = 20;
  coinTextFont: string = "Arial";
  coinTextAlign: string = "center";
  coinStroke: number = 0;
  coinStrokeColor: number = 0;

  priceText!: TextData;
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
    super.setPopupBg( "bg" );

    if( this.textureJson.title ) this.prizeBg = this.buildUI( this.textureJson.title );
    if( this.textureJson.coinIcon ) this.coinItem = this.buildUI( this.textureJson.coinIcon );

    this.buyBtn = this.buildUI( this.textureJson.buyBtn );
    this.closeBtn = this.buildUI( this.textureJson.closeBtn );

    // let product: any = Trigger.popupData.product;

    this.priceText = this.textureJson.price;
    this.priceNumberText = "$3.99"// + product["price"];//Number(product["items"][0].after_discount_coins);

    this.coinText = this.textureJson.coins;
    this.coinNumberText = "180"// + product["price"];//Number(product["items"][0].after_discount_coins);
  }

  ngOnDestroy(): void {
    
  }

  buyPo(){
    Trigger.modalCommand( ModalCommands.BUY_PO );
  }
}
