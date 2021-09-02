import { WebPages } from '../../gameUILogic/WebPages';
import { Trigger } from '../../gameUILogic/Trigger';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-31 12:56:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-02 12:00:24
 */
import { Component } from '@angular/core';
import { UIComponent, BitmapData } from '../../../basicUI/basic-ui.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent extends UIComponent{

  bottomBg!: BitmapData;
  home!: BitmapData;
  shop!: BitmapData;
  rank!: BitmapData;
  my!: BitmapData;

  constructor(public http: HttpClient) {
    super(http);
    this.textureUrl = "assets/bottom_bar/bottom_bar.json";
   }

   initUI(){
    this.bottomBg = this.textureData.getTexture( "bottom_bg" );
    this.home = this.textureData.getTexture( "HOME", 30, 10 );
    this.shop = this.textureData.getTexture( "SHOP", 226, 10 );
    this.rank = this.textureData.getTexture( "RANK", 422, 10 );
    this.my = this.textureData.getTexture( "MY", 618, 10 );
  }

  logout(){
    localStorage.removeItem( "user_account_info" );
    window.location.href = window.location.origin + window.location.pathname;
  }

  gotoBank(){
    Trigger.gotoPage( WebPages.SHOP );
  }
}
