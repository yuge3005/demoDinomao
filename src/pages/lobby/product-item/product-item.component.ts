/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-04 10:57:48
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:23:17
 */
import { Rectangle, ListItem, StyleX } from 'resize-able-ui';
import { Trigger, User } from '../../../service/dinomao-game.module';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent extends ListItem {

  textColor: number = 0;
  textSize: number = 32;
  textAlign: string = "left";
  priceRect: Rectangle = new Rectangle( 65, 363, 150, 32 );
  nameRect: Rectangle = new Rectangle( 25, 321, 270, 32 );

  productId: string = '';

  isFree: boolean = false;
  isVip: boolean = false;

  constructor() {
    super();
  }

  initUI(){
    this.ui.productBg = this.textureData.getTexture( "bg0", 0, 0 );
    this.ui.vipFlag = this.textureData.getTexture( "VIP_Subscript", -9, -11 );
    this.ui.coinIcon = this.textureData.getTexture( "icon_coin", 10, 355 );
    this.ui.freeIcon = this.textureData.getTexture( "free", 15, 358 );
    this.ui.infoIcon = this.textureData.getTexture( "btn_info", 292, 355 );
    this.productId = "productItem" + this.itemData.good_id;

    this.sty.position = StyleX.setItemPosition( this.index % 2 * 365 + 22, Math.floor(this.index/2) * 425 + 25 );

    this.isFree = this.itemData.isFree == "1" && User.instance.isFree;
    this.isVip = this.itemData.isVIP == "1";

    this.sty.productImageStyle = StyleX.borderRadius( 15 );
    this.sty.productPicPosition = StyleX.combine( StyleX.setItemPosition( 14, 11 ), StyleX.noneSelect() );
  }

  onImgload(){
    this.itemData.imgLoaded = true;
  }

  onItemClick( event: Event ){
    event.preventDefault();
    if( event instanceof MouseEvent ){
      if( event.target instanceof HTMLDivElement ){
        if( this.textureData.compareBitmapAndHtmlElement( this.ui.infoIcon, event.target ) ){
          Trigger.popupManager.showProductInfo( this.itemData );
          return;
        }
      }
    }

    this.itemClick.emit( this.itemData );
  }
}
