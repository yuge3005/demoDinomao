/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-20 10:43:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-02 13:52:29
 */
import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/service/loading.service';

@Component({
  selector: 'app-loading-and-po',
  templateUrl: './loading-and-po.component.html',
  styleUrls: ['./loading-and-po.component.css']
})
export class LoadingAndPoComponent implements OnInit{
  @Input() mainHeight!: number;
  @Input() po!: Object | null;
  loading: boolean = true;

  loadingBgURL: string = 'url(assets/loading_bg.jpg)';
  loadingBg: string = 'url(assets/loading_bg.jpg)';
  constructor( private loadingSV: LoadingService ) { }

  ngOnInit(){
    this.loadingSV.needLoading = this.showLoadingUI.bind(this);
  }

  showLoadingUI( loagingLevel: number ){
    if( loagingLevel == 0 ){
      this.loading = true;
      this.loadingBg = this.loadingBgURL;
    }
    else if( loagingLevel == 1 ){
      this.loading = true;
      this.loadingBg = "";
    }
  }
}
