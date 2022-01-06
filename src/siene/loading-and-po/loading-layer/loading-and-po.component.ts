/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-20 10:43:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 14:09:33
*/
import { StyleX } from 'resize-able-ui';
import { Component, Input, OnInit } from '@angular/core';
import { Loading, Purchase, Trigger, trace } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-loading-and-po',
  templateUrl: './loading-and-po.component.html',
  styleUrls: ['./loading-and-po.component.css']
})
export class LoadingAndPoComponent implements OnInit{
  @Input() mainHeight!: number;
  loagingLevel: number = 0;

  public get showingLoading(): boolean{
    return Trigger.hasPopup || this.loagingLevel < 2 || Purchase.purchasing;
  }
  
  public get showLoadingGif(): boolean{
    return !Trigger.hasPopup || Trigger.isLaoding || Purchase.purchasing;
  }

  loadingBg: Object = {};
  loadingPicture: Object = {};
  loadingShadow: Object = {};
  
  constructor() { }

  ngOnInit(){
    this.showLoadingUI( this.loagingLevel );
    Loading.loadingStateHandler = this.showLoadingUI.bind(this);

    this.loadingPicture = StyleX.combine( StyleX.setSize(225,250), StyleX.anchorOffset(112,125) );
    this.loadingShadow = StyleX.backgroundColor(0,0.8);
  }

  showLoadingUI( loagingLevel: number ){
    trace.log( loagingLevel );
    this.loagingLevel = loagingLevel;
    this.loadingBg = StyleX.stretchingBg( this.loagingLevel == 0 ? "assets/loading_ui/loading_bg.jpg" : "" );
  }
}
