import { UIFromParent, Point, BitmapData, Tween } from '../../../basicUI/basic-ui.module';
import { Component, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { GM, GoodsData, Trigger, Loading, HttpRequest, CategoryData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends UIFromParent {

  machines: GoodsData[] = [];
  @Input() pageHeight: number = 0;
  @Input() categoryList!: CategoryData[];
  categoryId: number = 0;
  pageSize: number = 0;
  checkLoadingId: any;
  checkLoadingTimeout: number = 6;

  hasEnterLobby: boolean = false;

  @Output() itemClick: EventEmitter<GoodsData> = new EventEmitter<GoodsData>();

  iconListBg!: BitmapData;
  iconListMask!: BitmapData;
  bannerHr!: BitmapData;

  private commingPage: number = 0;
  private carouselState: number = 0;

  @ViewChild('carousel', {static: true}) carousel!: ElementRef;

  private _styleLeft: number = 0;
  set styleLeft( value: number ){
    this._styleLeft = value;
    if( this.carousel ) this.carousel.nativeElement.style.left = value + "px";
  }
  get styleLeft(): number{
    return this._styleLeft;
  }

  categoryMovingLeft = false;

  constructor() {
      super();
  }

  initUI(){
    this.iconListBg = this.textureData.getTexture( "entrance_bg", 0, -9 );
    this.iconListMask = this.textureData.getTexture( "Mask", 0, -14 );
    this.bannerHr = this.textureData.getTexture( "1", 0, -23 );

    Trigger.categoryCallback = this.gotoCategory.bind(this);
    eval( "document.changeCategory=this.gotoCategory.bind(this)" )
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );

    if( changes.categoryList && this.categoryList ){
      this.gotoCategory( Number( this.categoryList[0].score_class_id ) );
    }
  }

  get initailSize(): number{
    return Math.ceil( ( this.pageHeight - 495 ) / 425 ) * 2;
  }

  ngOnDestroy(): void {
    clearTimeout( this.checkLoadingId );
    Trigger.categoryCallback = null;
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
      new HttpRequest().loadData( "cmd.php?action=goods_list&page=" + wantPage + "&category=" + this.categoryId + obStr, this.getGoodList.bind(this), "POST", postStr );
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

  gotoCategory( categoryId: number ){
    if( this.categoryId == categoryId ) return;
    this.categoryId = categoryId;
    this.commingPage = 0;
    this.pageSize = this.initailSize;
    this.machines.length = 0;
    this.loadMoreGoods();
    this.categoryIconMove( categoryId );
  }

  iconPosition( index: number ): number{
    if( index < this.categoryList.length - ( this.categoryMovingLeft ? 4 : 2 ) ) return index * 160 + 300;
    else return ( index - this.categoryList.length ) * 160 + 300;
  }

  changeCategory( event: Point ){
    let index: number = Math.floor( ( event.x + 25 ) / 160 );
    index -= 2;
    if( index < 0 ) index += this.categoryList.length;
    let categoryId: number = Number( this.categoryList[index].score_class_id );
    this.gotoCategory( categoryId );
  }

  categoryIconMove( categoryId: number ){
    var targetCategoryIndex: number;
    if( this.categoryList && this.categoryList.length ){
      for( let i: number = 0; i < this.categoryList.length; i++ ){
        if( this.categoryList[i].score_class_id == "" + categoryId ){
          targetCategoryIndex = i;
          this.setCarouselState( targetCategoryIndex );
          return;
        }
      }
      alert( "undefined category id: " + categoryId );
    }
  }

  setCarouselState( targetCategoryIndex: number ){
    if( targetCategoryIndex < this.categoryList.length - 2 ){
      this.carouselState = targetCategoryIndex;
    }
    else{
      this.categoryMovingLeft = true;
      this.carouselState = targetCategoryIndex - this.categoryList.length;
    }
    Tween.to( this, 0.3, { styleLeft: -160 * this.carouselState }, 0, this.reolderCategoryIcons.bind( this ) );
  }

  reolderCategoryIcons(){
    let carouselNumber: number = this.carouselState;
    this.categoryMovingLeft = false;
    while( carouselNumber > 0 ){
      let ctItem: CategoryData | undefined = this.categoryList.shift();
      if( ctItem ) this.categoryList.push( ctItem );
      carouselNumber--;
    }
    while( carouselNumber < 0 ){
      let ctItem: CategoryData | undefined = this.categoryList.pop();
      if( ctItem ) this.categoryList.unshift( ctItem );
      carouselNumber++;
    }
    this.carouselState = 0;
    this.styleLeft = 0;
  }
}
