/*
* @Description: the lobby
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-06-08 12:06:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-03 15:48:23
*/
import { Component } from '@angular/core';
import { GM, GamePlatform, GameLoginType, GoodsData, CategoryData, Trigger, trace, FacebookData, GameHttp, User, UserAddress, MainPage, WebPages, DailyBonus } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html'
})
export class LobbyComponent extends MainPage {
  categorys!: CategoryData[];
  currentCategoryId: number = 0;
  constructor() {
    super();
    this.textureUrl = "assets/product_list/product_list.json";
  }

  initUI() {
    
  }

  getDataFromLocal(){
    this.setCategory();
  }
  
  private setCategory(){
    this.categorys = GM.categorys;
  }

  onProductItemClick( itemData: GoodsData ){
    Trigger.gotoPage( WebPages.VIDEO, itemData );
  }

  onCategoryChange( category: number ){
    setTimeout( () => { this.currentCategoryId = category }, 10 );
  }
}
