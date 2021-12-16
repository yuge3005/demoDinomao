import { BigDice } from './BigDice';
/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-09 16:53:48
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 15:10:02
*/
import { Component } from '@angular/core';
import { BitmapData, MovieClip, SimpleMovieClip, MovieClipDataFactory, Ease, Tween, Point } from '../../basicUI/basic-ui.module';
import { GenericModalComponent, TextData, Trigger, GoodsData } from '../../service/dinomao-game.module';

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

  guang!: SimpleMovieClip;
  fireworks!: SimpleMovieClip;
  turbo90!: MovieClip;
  turboBalls!: MovieClip;
  dice!: BigDice;

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

    this.guang = new SimpleMovieClip( "assets/guangAnimation/guang_tex.png", "assets/guangAnimation/guang_tex.json" );
    this.guang.scaleX = this.guang.scaleY = 1.4;
    this.guang.setPosition( 190, 410 );

    this.fireworks = new SimpleMovieClip( "assets/common_popups/result/fireworks.png", "assets/common_popups/result/fireworks.json" );
    this.fireworks.scaleX = this.fireworks.scaleY = 2.4;
    this.fireworks.setPosition( 180, 200 );

    let mcf: MovieClipDataFactory = new MovieClipDataFactory( "assets/mc/turbo90Animation.png", "assets/mc/turbo90Animation.json" );
    this.turbo90 = new MovieClip( mcf.getMovieClipData( "lotto_balls_up" ) );
    this.turbo90.setPosition( 150 + 225, 0 );
    this.turbo90.setAnchorOffset( 225, 0 );
    this.turbo90.scaleX = this.turbo90.scaleY = 0.5;

    this.turboBalls = new MovieClip( mcf.getMovieClipData("lotto_balls") );
    this.turboBalls.setPosition( 150 + 225, 0 );
    this.turboBalls.setAnchorOffset( 225, 0 );
    this.turboBalls.scaleX = this.turboBalls.scaleY = 0.5;

    this.dice = new BigDice();
    this.dice.setPosition( 200, 300 );
    this.dice.scaleX = this.dice.scaleY = 3;
    this.dice.gotoAndStop( "d17" );
  }

  goPlay(){
    // this.closePo();
    // Trigger.gotoPage( WebPages.VIDEO, this.itemData );
    this.dice.setPosition( 550, 200 );
    this.dice.startPosition = new Point().init( 550, 200 );

    this.dice.endPosition = new Point().init( 100 + Math.random() * 200, 500 );
    this.dice.middlePosition = new Point().init( 400 + Math.random() * 100, 500 );

    this.dice.gotoAndPlay( "loop" );
    Tween.to( this.dice, 1, { factor: 1 }, 0, this.getNumber.bind( this ), Ease.CircEaseInOut );
  }
  
  getNumber(){
    this.dice.gotoAndStop( "d" + Math.floor( Math.random() * 6 + 16 ) );
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
