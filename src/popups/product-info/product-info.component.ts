/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-09 16:53:48
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-14 17:42:53
*/
import { Component } from '@angular/core';
import { BitmapData, EgretMc, MovieClip, MovieClipDataFactory } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, TextData, Trigger, GoodsData, WebPages } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent extends GenericModalComponent{

  goBtn!: BitmapData;
  vip!: BitmapData;

  nameText!: TextData;
  tipText!: TextData;
  nameString: string = "";
  tipString: string = "";

  productImg: string = "";

  isBgLoaded: boolean = false;
  isProductLoaded: boolean = false;

  isVip: boolean = false;

  itemData!: GoodsData;

  guang!: MovieClip;
  fireworks!: MovieClip;
  turbo90!: EgretMc;
  turboBalls!: EgretMc;

  constructor() {
    super();
  }

  initUI(){
    super.setPopupBg( "bg" );

    if( !Trigger.isInGame ) this.goBtn = this.buildUI( this.textureJson.goBtn );
    this.closeBtn = this.buildUI( this.textureJson.closeBtn );
    this.vip = this.buildUI( this.textureJson.vip );

    let products: any = Trigger.popupData.products;
    let product: any = products[0];
    this.itemData = product.product;
    this.productImg = this.itemData.img;
    this.isVip = this.itemData.isVIP == "1";

    this.nameText = this.textureJson.productName;
    this.nameString = this.itemData.name;
    this.tipText = this.textureJson.tipText;
    this.tipString = this.itemData.msg;

    this.guang = new MovieClip( "assets/guangAnimation/guang_tex.png", "assets/guangAnimation/guang_tex.json" );
    this.guang.scaleX = this.guang.scaleY = 1.4;
    this.guang.setPosition( 190, 410 );

    this.fireworks = new MovieClip( "assets/common_popups/result/fireworks.png", "assets/common_popups/result/fireworks.json" );
    this.fireworks.scaleX = this.fireworks.scaleY = 2.4;
    this.fireworks.setPosition( 180, 200 );

    let mcf: MovieClipDataFactory = new MovieClipDataFactory( "assets/mc/turbo90Animation.png", "assets/mc/turbo90Animation.json" );
    this.turbo90 = new EgretMc( mcf.getMovieClipData( "lotto_balls_up" ) );
    this.turbo90.setPosition( 150, 0 );

    this.turboBalls = new EgretMc( mcf.getMovieClipData("lotto_balls") );
    this.turboBalls.setPosition( 150, 0 );
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
