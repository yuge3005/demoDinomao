/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 16:34:24
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-31 15:57:08
 */
import { Component } from '@angular/core';
import { BitmapData, StyleX } from 'resize-able-ui';
import { MainPage, AddressData, UserAddress, Loading, GameHttp, GM, Trigger, WebPages } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css']
})
export class PrizeComponent extends MainPage {

  showPrize: boolean = true;

  shocked!: BitmapData;
  addBtn!: BitmapData;
  addressBtn!: BitmapData;
  arrowIcon!: BitmapData;

  allPrizeIcon!: BitmapData;
  allPrizeBtn!: BitmapData;
  packageIcon!: BitmapData;
  packageBtn!: BitmapData;

  mainString: string = "";

  prizeList: any[] = [];
  itemData!: AddressData;

  constructor() {
    super();
    this.textureUrl = "assets/prize/prize.json";
  }

  initUI() {
    Loading.status = 1;

    this.addBtn = this.textureData.getTexture( "plus", 21, 415 );
    this.addressBtn = this.textureData.getTexture( "bg_adress", 24, 240 );
    this.arrowIcon = this.textureData.getTexture( "right", 640, 50 );

    this.allPrizeIcon = this.textureData.getTexture( "all-active", 95, 153 );
    this.allPrizeBtn = this.textureData.getTexture( "all", 95, 151 );
    this.packageIcon = this.textureData.getTexture( "package-active", 390, 153 );
    this.packageBtn = this.textureData.getTexture( "package", 390, 151 );

    this.shocked = this.textureData.getTexture( "shocked", 300, 700 );
    new GameHttp().loadData( "cmd.php?action=shop&" + GM.interfaceString, this.getPrizeList.bind(this), "POST", "type=get_prize_list" );

    this.itemData = UserAddress.instance.addressList[0];
    this.mainString = this.itemData.addr + "," + this.itemData.city + "," + this.itemData.province + "," + this.itemData.country + "," + this.itemData.postal;

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
  }

  setData( data: any = null ){
    if( data == "package" ) this.showPrize = false;
  }

  addOrder(){
    this.showPrize = true;
  }

  switchPannel( showPrize: boolean ){
    this.showPrize = showPrize;
  }

  getPrizeList( data: any ){
    console.log( data );
    Loading.status = 2;
    this.prizeList = data.list;
  }

  editAddress(){
    UserAddress.fromPage = WebPages.PRIZE;
    Trigger.gotoPage( WebPages.ADDRESS );
  }
}
