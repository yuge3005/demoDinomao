/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-20 10:43:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-06 13:37:01
 */
import { Component, Input, OnInit } from '@angular/core';
import { Loading, Purchase, Trigger } from 'src/service/dinomao-game.module';

@Component({
  selector: 'app-loading-and-po',
  templateUrl: './loading-and-po.component.html',
  styleUrls: ['./loading-and-po.component.css']
})
export class LoadingAndPoComponent implements OnInit{
  @Input() mainHeight!: number;
  showingLoading: boolean = true;
  loagingLevel: number = 0;

  public get showingLoadingBg(): boolean{
    return this.showingLoading || Trigger.hasPopup;
  }
  public get showLoadingGif(): boolean{
    if( Trigger.hasPopup ) {
      return !Trigger.laoded || Purchase.purchasing;
    }
    else{
      return true;
    }
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
    if( loagingLevel == 0 ){
      this.showingLoading = true;
    }
    else if( loagingLevel == 1 ){
      this.showingLoading = true;
    }
    else if( loagingLevel == 2 ){
      this.showingLoading = false;
    }
  }
}
