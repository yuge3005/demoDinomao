/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-20 10:43:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-17 09:38:29
 */
import { Component, Input, OnInit } from '@angular/core';
import { Loading, Purchase, Trigger } from '../../../service/dinomao-game.module';

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
    return !Trigger.hasPopup || !Trigger.laoded || Purchase.purchasing;
  }

  loadingBgURL: string = 'url(assets/loading_ui/loading_bg.jpg)';
  public get loadingBg(): string{
    if( this.loagingLevel == 0 ) return this.loadingBgURL;
    else return ""; 
  }
  
  constructor() { }

  ngOnInit(){
    Loading.loadingStateHandler = this.showLoadingUI.bind(this);
  }

  showLoadingUI( loagingLevel: number ){
    console.log( loagingLevel );
    this.loagingLevel = loagingLevel;
  }
}
