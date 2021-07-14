/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-20 10:43:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 13:25:07
 */
import { Component, Input, OnInit } from '@angular/core';
import { Loading } from 'src/service/gameUILogic/Loading';

@Component({
  selector: 'app-loading-and-po',
  templateUrl: './loading-and-po.component.html',
  styleUrls: ['./loading-and-po.component.css']
})
export class LoadingAndPoComponent implements OnInit{
  @Input() mainHeight!: number;
  @Input() po!: Object | null;
  loading: boolean = true;
  showingLoading: boolean = true;

  loadingBgURL: string = 'url(assets/loading_ui/loading_bg.jpg)';
  loadingBg: string = 'url(assets/loading_ui/loading_bg.jpg)';
  constructor() { }

  ngOnInit(){
    Loading.loadingStateHandler = this.showLoadingUI.bind(this);
  }

  showLoadingUI( loagingLevel: number ){
    console.log( loagingLevel );
    if( loagingLevel == 0 ){
      this.loading = true;
      this.loadingBg = this.loadingBgURL;
      this.showingLoading = true;
    }
    else if( loagingLevel == 1 ){
      this.loading = true;
      this.loadingBg = "";
      this.showingLoading = true;
    }
    else if( loagingLevel == 2 ){
      this.showingLoading = false;
    }
  }
}
