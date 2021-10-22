/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-04 10:57:48
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-08 10:28:29
 */
import { Rectangle, BitmapData, ListItemComponent } from '../../../basicUI/basic-ui.module';
import { Trigger, User } from '../../../service/dinomao-game.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent extends ListItemComponent {

  productBg!: BitmapData;
  vipFlag!: BitmapData;
  coinIcon!: BitmapData;
  infoIcon!: BitmapData;
  freeIcon!: BitmapData;

  textColor: number = 0;
  textSize: number = 32;
  textAlign: string = "left";
  priceRect: Rectangle = new Rectangle().init( 65, 363, 150, 32 );
  nameRect: Rectangle = new Rectangle().init( 25, 321, 270, 32 );

  position: string = '';
  productId: string = '';

  isFree: boolean = false;
  isVip: boolean = false;

  constructor() {
    super();
  }

  initUI(){
    this.productBg = this.textureData.getTexture( "bg0", 0, 0 );
    this.vipFlag = this.textureData.getTexture( "VIP_Subscript", -9, -11 );
    this.coinIcon = this.textureData.getTexture( "icon_coin", 10, 355 );
    this.freeIcon = this.textureData.getTexture( "free", 15, 358 );
    this.infoIcon = this.textureData.getTexture( "btn_info", 292, 355 );
    this.productId = "productItem" + this.itemData.good_id;

    this.position = `
      left: ${this.index % 2 * 365 + 22}px;
      top: ${Math.floor(this.index/2) * 425 + 25}px;
    `

    this.isFree = this.itemData.isFree == "1" && User.instance.isFree;
    this.isVip = this.itemData.isVIP == "1";
  }

  onImgload(){
    this.itemData.imgLoaded = true;
  }

  onItemClick( event: Event ){
    event.preventDefault();
    if( event instanceof MouseEvent ){
      if( event.target instanceof HTMLDivElement ){
        if( this.textureData.compareBitmapAndHtmlElement( this.infoIcon, event.target ) ){
          Trigger.popupManager.showProductInfo( this.itemData );
          return;
        }
      }
    }

    this.itemClick.emit( this.itemData );
  }
}
