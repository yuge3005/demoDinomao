import { UIFromParent, StyleX } from 'resize-able-ui';
import { Component, Input, SimpleChanges } from '@angular/core';
import { GM, GoodsData, Trigger, Loading, GameHttp, WebPages, trace } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
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

  initUI(){
    this.styles.productList = StyleX.combine( StyleX.stretchingBg( "assets/product_list/bg.png" ), StyleX.setItemPosition(0,286), StyleX.setSize(750,0,true,false) );
    this.styles.scrollBar = StyleX.combine( StyleX.scrollBar(), StyleX.setItemPosition(0,130), StyleX.setSize(750,0,true,false) );
  }

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
    trace.log("checkLoading")
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
      trace.log(this.machines[i].imgLoaded)
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
      if( this.hasEnterLobby ) Loading.status = 1;
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

  onListItemClick( itemData: any ){
    Trigger.gotoPage( WebPages.VIDEO, itemData );
  }

  onScroll(event: any){
    if( event.target.scrollTop + this.productAreaHeight-165 >= event.target.scrollHeight ){
      this.loadMoreGoods();
    }
  }
}
