import { UIFromParent } from '../../../basicUI/basic-ui.module';
import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { GM, GoodsData, Trigger, Loading, GameHttp } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends UIFromParent {

  machines: GoodsData[] = [];
  @Input() productAreaHeight: number = 0;
  @Input() categoryId: number = 0;
  currentCategoryId: number = 0;
  pageSize: number = 0;
  checkLoadingId: any;
  checkLoadingTimeout: number = 6;

  private commingPage: number = 0;

  hasEnterLobby: boolean = false;

  constructor() {
    super();
  }

  initUI(){}

  get initailSize(): number{
    return Math.ceil( ( this.productAreaHeight - 130 ) / 425 ) * 2;
  }

  ngOnDestroy(): void {
    clearTimeout( this.checkLoadingId );
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );

    if( this.categoryId && this.machines ){
      if( this.categoryId != this.currentCategoryId ){
        this.currentCategoryId = this.categoryId;
        this.commingPage = 0;
        this.pageSize = this.initailSize;
        this.machines.length = 0;
        this.loadMoreGoods();
      }
    }
  }

  checkLoading(){
    console.log("checkLoading")
    if(!this.machines.length){
      this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
      return;
    }
    this.checkLoadingTimeout --;
    if( this.checkLoadingTimeout <= 0 ){
      this.checkLoadingResult();
      return;
    }
    for( var i: number = 0; i < this.pageSize && i < this.machines.length; i++ ){
      console.log(this.machines[i].imgLoaded)
      if( !this.machines[i].imgLoaded ){
        this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
        return;
      }
    }
    this.checkLoadingResult();
  }

  checkLoadingResult(){
    this.loadOver();
    if( !this.hasEnterLobby ) {
      this.hasEnterLobby = true;
      Trigger.lobby( this.delayLoadProductPictures.bind(this) );
    }
    else{
      this.loadrest();
    }
  }

  delayLoadProductPictures(){
    this.loadrest();
  }
  
  private loadrest(){
    this.pageSize = this.machines.length;
  }

  loadMoreGoods(){
    if( this.pageSize >= this.machines.length ) this.loadMoreMachineDataFromNetInterface();
  }

  loadMoreMachineDataFromNetInterface(){
    let wantPage: number = Math.floor( this.pageSize / 20 ) + 1;
    let obStr: string = GM.interfaceString;
    if( !obStr ){
      setTimeout( this.loadMoreMachineDataFromNetInterface.bind( this ), 100 );
      return;
    }
    if( this.commingPage < wantPage ){
      Loading.status = 1;
      this.commingPage = wantPage;
      let postStr: string = "type=normal_goods_list";
      new GameHttp().loadData( "cmd.php?action=goods_list&page=" + wantPage + "&category=" + this.currentCategoryId + obStr, this.getGoodList.bind(this), "POST", postStr );
    }
  }

  getGoodList( data: any ){
    if( data?.list?.length ){
      data.list.sort( () => { return Math.random() - 0.5 } );
      this.machines = this.machines.concat( data.list );
      this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
      this.checkLoadingTimeout = 6;
    }
  }

  loadOver(){
    Loading.status = 2;
  }
}
