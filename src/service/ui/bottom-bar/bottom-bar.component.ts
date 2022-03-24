import { WebPages } from '../../gameUILogic/UILogicDatas';
import { Trigger } from '../../gameUILogic/Trigger';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-31 12:56:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 15:53:43
 */
import { Component, Input } from '@angular/core';
import { UIComponent, StyleX } from 'resize-able-ui';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html'
})
export class BottomBarComponent extends UIComponent{

  @Input() iconBigIndex: number = 0;

  constructor() {
    super();
    this.textureUrl = "assets/bottom_bar/bottom_bar.json";
   }

   initUI(){
    this.ui.bottomBg = this.textureData.getTexture( "bottom_bg" );
    this.ui.home = this.textureData.getTexture( "HOME", 44, 30 );
    this.ui.shop = this.textureData.getTexture( "SHOP", 244, 32 );
    this.ui.price = this.textureData.getTexture( "PRIZE", 444, 30 );
    this.ui.my = this.textureData.getTexture( "MY", 627, 30 );
    this.ui.homeIcon = this.textureData.getTexture( "HOME1", 30, 5 );
    this.ui.shopIcon = this.textureData.getTexture( "SHOP1", 220, 14 );
    this.ui.priceIcon = this.textureData.getTexture( "PRIZE1", 422, 5 );
    this.ui.myIcon = this.textureData.getTexture( "MY1", 618, 5 );

    this.sty.bottomBar = StyleX.combine( StyleX.setSize(750,125), StyleX.setItemPosition(0,0,false,true) );
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
