import { Application, UIComponent, Point, BitmapData } from '../../../basicUI/basic-ui.module';
import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GM, GoodsData, Trigger, Loading, HttpRequest, CategoryData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends UIComponent {

  machines: GoodsData[] = [];
  @Input() listHeight: number = 0;
  @Input() categoryList!: CategoryData[];
  categoryId: number = 0;
  pageSize: number = 0;
  checkLoadingId: any;
  checkLoadingTimeout: number = 6;

  hasEnterLobby: boolean = false;

  @Output() itemClick: EventEmitter<GoodsData> = new EventEmitter<GoodsData>();

  private pl!: HTMLElement | null;

  iconListBg!: BitmapData;
  iconListMask!: BitmapData;

  private draging: Point | null = null;
  private moving: Point | null = null;
  private dragingStartTime!: Date;
  private scrollYStart: number = 0;
  private _scrollY: number = 0;

  private commingPage: number = 0;

  get scrollY(): number{
    return this._scrollY;
  }
  set scrollY( value: number ){
    let minY: number = - Math.ceil( Math.min( this.machines.length, this.pageSize ) / 2 ) * 425 + this.listHeight - 610;
    if( value < minY ){
      if( value - minY < -100 ) this.loadMoreGoods();
      value = minY;
    }
    if( value > 0 ) value = 0;
    this._scrollY = value;
  }
  constructor( public http: HttpClient ) {
      super(http);
      this.textureUrl = "assets/product_list/product_list.json";
  }

  initUI(){
    this.iconListBg = this.textureData.getTexture( "entrance_bg", 0, -9 );
    this.iconListMask = this.textureData.getTexture( "Mask", 0, -14 );

    this.pl = document.getElementById( "productListBarDiv" );
    if( this.pl ){
      if( Application.system.isMobile() ){
        this.pl.addEventListener( "touchstart", this.onTouchStart.bind( this ) );
        this.pl.addEventListener( "touchmove",  this.onTouchMove.bind( this ) );
        this.pl.addEventListener( "touchend",  this.stopDrag.bind( this ) );
        this.pl.addEventListener( "touchcancel",  this.stopDrag.bind( this ) );
      }
      else{
        this.pl.addEventListener( "mousedown", this.onDrag.bind(this) );
        this.pl.addEventListener( "mousemove", this.onMove.bind(this) );
        this.pl.addEventListener( "mouseup", this.stopDrag.bind(this) );
        this.pl.addEventListener( "mouseout", this.stopDrag.bind(this) );
      }
    }
    document.addEventListener( "wheel", this.onWheel.bind(this) );

    Trigger.categoryCallback = this.gotoCategory.bind(this);
    this.gotoCategory( 12 );
  }

  get initailSize(): number{
    return Math.ceil( ( this.listHeight - 495 ) / 425 ) * 2;
  }

  onItemClick( itemData: GoodsData ){
    if( new Date().getTime() - this.dragingStartTime.getTime() > 200 ) return;
    if( !this.draging ) return;
    if( this.draging && this.moving && Point.distance( this.moving, this.draging ) > 10 ) return;
    this.itemClick.emit( itemData );
  }

  onDrag( event: MouseEvent ): void{
    event.preventDefault();
    this.moving = this.draging = new Point().init( event.clientX, event.clientY );
    this.dragingStartTime = new Date;
    this.scrollYStart = this.scrollY;
  }

  onTouchStart( event: TouchEvent ): void{
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    this.moving = this.draging = new Point().init( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
    this.dragingStartTime = new Date;
    this.scrollYStart = this.scrollY;
  }

  onMove( event: MouseEvent ){
    event.preventDefault();
    if( this.draging ){
      this.scrollY = ( event.clientY - this.draging.y ) / Application.settings.scaleY + this.scrollYStart;
      this.moving = new Point().init( event.clientX, event.clientY );
    }
  }

  onTouchMove( event: TouchEvent ){
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    if( this.draging ){
      this.scrollY = ( event.changedTouches[0].clientY - this.draging.y ) / Application.settings.scaleY + this.scrollYStart;
      this.moving = new Point().init( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
    }
  }

  stopDrag(){
    this.draging = null;
  }

  ngOnDestroy(): void {
    if( this.pl ){
      if( Application.system.isMobile() ){
        this.pl.removeEventListener( "touchstart", this.onTouchStart.bind( this ) );
        this.pl.removeEventListener( "touchmove",  this.onTouchMove.bind( this ) );
        this.pl.removeEventListener( "touchend",  this.stopDrag.bind( this ) );
        this.pl.removeEventListener( "touchcancel",  this.stopDrag.bind( this ) );
      }
      else{
        this.pl.removeEventListener( "mousedown", this.onDrag.bind(this) );
        this.pl.removeEventListener( "mousemove", this.onMove.bind(this) );
        this.pl.removeEventListener( "mouseup", this.stopDrag.bind(this) );
        this.pl.removeEventListener( "mouseout", this.stopDrag.bind(this) );
      }
      this.pl = null;
    }
    document.removeEventListener( "wheel", this.onWheel.bind(this) );
    clearTimeout( this.checkLoadingId );
    Trigger.categoryCallback = null;
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    this.scrollY += -event.deltaY;
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
      this.pageSize = this.machines.length;
    }
  }

  delayLoadProductPictures(){
    this.pageSize = this.machines.length;
  }

  loadMoreGoods(){
    if( this.pageSize >= this.machines.length ) this.loadMoreMachineDataFromNetInterface();
    // else{
    //   let newPageSize: number = this.pageSize + 4;
    //   this.pageSize = Math.min( this.machines.length, newPageSize );
    //   Loading.status = 1;
    //   this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
    //   this.checkLoadingTimeout = 6;
    // }
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
    if( data && data.list && data.list.length ){
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
    this.scrollY = 0;
    this.loadMoreGoods();
  }
}
