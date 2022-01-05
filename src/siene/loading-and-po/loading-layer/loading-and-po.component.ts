/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-05-20 10:43:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:20:19
*/
import { StyleX } from '../../../basicUI/basic-ui.module';
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
  
  constructor() { }

  ngOnInit(){
    this.showLoadingUI( this.loagingLevel );
    Loading.loadingStateHandler = this.showLoadingUI.bind(this);
  }

  showLoadingUI( loagingLevel: number ){
    trace.log( loagingLevel );
    this.loagingLevel = loagingLevel;
    this.loadingBg = StyleX.stretchingBg( this.loagingLevel == 0 ? "assets/loading_ui/loading_bg.jpg" : "" );
  }
}
