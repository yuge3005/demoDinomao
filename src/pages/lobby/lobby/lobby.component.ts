/*
* @Description: the lobby
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-06-08 12:06:13
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-03 16:17:08
*/
import { Component } from '@angular/core';
import { GM, GoodsData, CategoryData, Trigger, MainPage, WebPages } from '../../../service/dinomao-game.module';

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
    this.categorys = GM.categorys;
  }

  onProductItemClick( itemData: GoodsData ){
    Trigger.gotoPage( WebPages.VIDEO, itemData );
  }

  onCategoryChange( category: number ){
    setTimeout( () => { this.currentCategoryId = category }, 10 );
  }
}
