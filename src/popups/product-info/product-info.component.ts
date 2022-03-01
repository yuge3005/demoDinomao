/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-09 16:53:48
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 17:37:21
*/
import { Component } from '@angular/core';
import { BitmapData, SimpleMovieClip, StyleX } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, TextData, Trigger, GoodsData, WebPages } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent extends GenericModalComponent{

  nameText!: TextData;
  tipText!: TextData;
  nameString: string = "";
  tipString: string = "";

  productImg: string = "";

  isBgLoaded: boolean = false;
  isProductLoaded: boolean = false;

  isVip: boolean = false;

  itemData!: GoodsData;

  guang!: SimpleMovieClip;

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "bg" );

    if( !Trigger.isInGame ) this.ui.goBtn = this.buildUI( this.textureJson.goBtn );
    this.ui.closeBtn = this.buildUI( this.textureJson.closeBtn );
    this.ui.vip = this.buildUI( this.textureJson.vip );

    let products: any = Trigger.popupData.products;
    let product: any = products[0];
    this.itemData = product.product;
    this.productImg = this.itemData.img;
    this.isVip = this.itemData.isVIP == "1";

    this.nameText = this.textureJson.productName;
    this.nameString = this.itemData.name;
    this.tipText = this.textureJson.tipText;
    this.tipString = this.itemData.msg;

    this.guang = new SimpleMovieClip( "assets/guangAnimation/guang_tex.png", "assets/guangAnimation/guang_tex.json" );
    this.guang.scaleX = this.guang.scaleY = 1.4;
    this.guang.setPosition( 190, 410 );

    this.styles.productImg = StyleX.combine( StyleX.borderRadius(25), StyleX.setItemRect( 210, 414, 330, 330 ), StyleX.noneSelect() );
    this.styles.tipTextStyle = StyleX.setItemRect( 25, 860, 700, 170 );
  }

  goPlay(){
    this.closePo();
    Trigger.gotoPage( WebPages.VIDEO, this.itemData );
  }

  bgTextureLoaded(){
    this.isBgLoaded = true;
    this.checkLoad();
  }

  productImgLoaded(){
    this.isProductLoaded = true;
    this.checkLoad();
  }

  checkLoad(){
    if( this.isProductLoaded && this.isBgLoaded ) this.loaded = true;
  }
}
