import { WebPages } from '../../gameUILogic/WebPages';
import { Trigger } from '../../gameUILogic/Trigger';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-31 12:56:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-09 17:31:17
 */
import { Component, Input } from '@angular/core';
import { UIComponent, BitmapData } from '../../../basicUI/basic-ui.module';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent extends UIComponent{

  bottomBg!: BitmapData;
  home!: BitmapData;
  shop!: BitmapData;
  price!: BitmapData;
  my!: BitmapData;
  homeIcon!: BitmapData;
  shopIcon!: BitmapData;
  priceIcon!: BitmapData;
  myIcon!: BitmapData;

  @Input() iconBigIndex: number = 0;

  constructor() {
    super();
    this.textureUrl = "assets/bottom_bar/bottom_bar.json";
   }

   initUI(){
    this.bottomBg = this.textureData.getTexture( "bottom_bg" );
    this.home = this.textureData.getTexture( "HOME", 44, 30 );
    this.shop = this.textureData.getTexture( "SHOP", 244, 32 );
    this.price = this.textureData.getTexture( "PRIZE", 444, 30 );
    this.my = this.textureData.getTexture( "MY", 627, 30 );
    this.homeIcon = this.textureData.getTexture( "HOME1", 30, 5 );
    this.shopIcon = this.textureData.getTexture( "SHOP1", 220, 14 );
    this.priceIcon = this.textureData.getTexture( "PRIZE1", 422, 5 );
    this.myIcon = this.textureData.getTexture( "MY1", 618, 5 );
  }

  gotoBank(){
    Trigger.gotoPage( WebPages.SHOP );
  }

  gotoLobby(){
    Trigger.gotoPage( WebPages.LOBBY );
  }

  gotoUserCenter(): void{
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  gotoPrize(){
    Trigger.gotoPage( WebPages.PRIZE );
  }
}
