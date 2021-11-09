/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-09 11:41:22
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-09 13:42:51
 */
import { Component } from '@angular/core';
import { BitmapData } from '../../basicUI/basic-ui.module';
import { MainPage, Trigger, WebPages, Loading, GameHttp, GM } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-order-for-goods',
  templateUrl: './order-for-goods.component.html',
  styleUrls: ['./order-for-goods.component.css']
})
export class OrderForGoodsComponent extends MainPage {

  backBtn!: BitmapData;
  title!: BitmapData;

  orderList!: any[];
  
  constructor() { 
    super();
    this.textureUrl = "assets/older_list/older_list.json";
  }

  initUI() {
    Loading.status = 1;

    this.backBtn = this.textureData.getTexture( "btn_return", 30, 125 );
    this.title = this.textureData.getTexture( "VIDEOS", 294, 150 );
    new GameHttp().loadData( "cmd.php?action=shop&" + GM.interfaceString + "&weeks=3&created=desc", this.getRecordList.bind(this), "GET", "type=get_order_list" );
  }

  gotoBack(){
    Trigger.gotoPage( WebPages.USER_CENTER );
  }

  getRecordList( data: any ){
    console.log( data );
    Loading.status = 2;
    this.orderList = data.list;
  }
}
