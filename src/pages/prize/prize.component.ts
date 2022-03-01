/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 16:34:24
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-10 11:50:52
 */
import { Component } from '@angular/core';
import { BitmapData, StyleX } from '../../basicUI/basic-ui.module';
import { MainPage, AddressData, UserAddress, Loading, GameHttp, GM, Trigger, WebPages, trace } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css']
})
export class PrizeComponent extends MainPage {

  showPrize: boolean = true;

  mainString: string = "";

  prizeList: any[] = [];
  itemData!: AddressData;

  constructor() {
    super();
    this.textureUrl = "assets/prize/prize.json";
  }

  initUI() {
    Loading.status = 1;

    this.ui.addBtn = this.textureData.getTexture( "plus", 21, 415 );
    this.ui.addressBtn = this.textureData.getTexture( "bg_adress", 24, 240 );
    this.ui.arrowIcon = this.textureData.getTexture( "right", 640, 50 );

    this.ui.allPrizeIcon = this.textureData.getTexture( "all-active", 95, 153 );
    this.ui.allPrizeBtn = this.textureData.getTexture( "all", 95, 151 );
    this.ui.packageIcon = this.textureData.getTexture( "package-active", 390, 153 );
    this.ui.packageBtn = this.textureData.getTexture( "package", 390, 151 );

    this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    this.styles.prizeListContainer = StyleX.combine( StyleX.borderRadius(18), StyleX.setItemPosition(10,220), StyleX.backgroundColor(0xfdd53f) );
    this.styles.noOrder = StyleX.setItemPosition(100,620);
    this.styles.allElse = StyleX.setItemRect(20,65,666,168);
    this.styles.addressDiv = StyleX.combine( StyleX.noneSelect(), StyleX.setItemPosition( 30, 245 ) );

    this.ui.shocked = this.textureData.getTexture( "shocked", 300, 700 );
    new GameHttp().loadData( "cmd.php?action=shop&" + GM.interfaceString, this.getPrizeList.bind(this), "POST", "type=get_prize_list" );

    this.itemData = UserAddress.instance.addressList[0];
    this.mainString = this.itemData.addr + "," + this.itemData.city + "," + this.itemData.province + "," + this.itemData.country + "," + this.itemData.postal;

    this.styles.scrollBar = StyleX.combine( StyleX.scrollBar(), StyleX.setItemPosition(20,230), StyleX.setSize(720,0,true,false) );
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
    trace.log( data );
    Loading.status = 2;
    this.prizeList = data.list;
  }

  editAddress(){
    UserAddress.fromPage = WebPages.PRIZE;
    Trigger.gotoPage( WebPages.ADDRESS );
  }

  onItemDelete( data: any ){
    let index: number = this.prizeList.indexOf( data );
    this.prizeList.splice( index, 1 );
  }
}
