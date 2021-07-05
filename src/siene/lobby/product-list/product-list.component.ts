import { Application } from 'src/basicUI/settings/Application';
import { Point } from '../../../basicUI/geom/point';
import { HttpClient } from '@angular/common/http';
import { UIComponent } from '../../../basicUI/ui/UIComponent';
import { BitmapData } from '../../../basicUI/image/bitmap-data';
import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MachineData } from 'src/service/machine-data';
import { LoadingService } from 'src/service/loading.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends UIComponent implements OnDestroy{

  @Input() machines: MachineData[] = [];
  @Input() listHeight: number = 0;
  pageSize: number = 0;
  checkLoadingId: any;
  checkLoadingTimeout: number = 6;

  @Output() itemClick: EventEmitter<MachineData> = new EventEmitter<MachineData>();

  private pl!: HTMLElement | null;

  iconList: BitmapData[] = [];

  private draging: Point | null = null;
  private moving: Point | null = null;
  private dragingStartTime!: Date;
  private scrollYStart: number = 0;
  private _scrollY: number = 0;

  get scrollY(): number{
    return this._scrollY;
  }
  set scrollY( value: number ){
    let minY: number = - Math.ceil( Math.min( this.machines.length, this.pageSize ) / 2 ) * 425 + this.listHeight - 700;
    if( value < minY ){
      if( value - minY < -100 ) this.loadMoreGoods();
      value = minY;
    }
    if( value > 0 ) value = 0;
    this._scrollY = value;
  }
  constructor(public http: HttpClient, private loadingSV: LoadingService) {
    super(http);
    this.textureUrl = "assets/product_list/product_list.json";
  }

  initUI(){
    this.iconList[0] = this.textureData.getTexture( "entrance_bg", 0, -9 );
    this.iconList[1] = this.textureData.getTexture( "btn_cool_guy", -105, -2 );
    this.iconList[2] = this.textureData.getTexture( "btn_beginner", 90, -2 );
    this.iconList[3] = this.textureData.getTexture( "btn_cuttie_garden", 285, -2 );
    this.iconList[4] = this.textureData.getTexture( "btn_happy_life", 480, -2 );
    this.iconList[5] = this.textureData.getTexture( "btn_beginner", 675, -2 );

    this.pageSize = Math.ceil( ( this.listHeight - 640 ) / 425 ) * 2;

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

    this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
    this.checkLoadingTimeout = 6;
  }

  onItemClick( itemData: MachineData ){
    if( new Date().getTime() - this.dragingStartTime.getTime() > 200 ) return;
    if( !this.draging ) return;
    if( this.draging && this.moving && Point.distance( this.moving, this.draging ) > 10 ) return;
    this.itemClick.emit( itemData );
  }

  onDrag( event: MouseEvent ): void{
    event.preventDefault();
    this.moving = this.draging = new Point( event.clientX, event.clientY );
    this.dragingStartTime = new Date;
    this.scrollYStart = this.scrollY;
  }

  onTouchStart( event: TouchEvent ): void{
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    this.moving = this.draging = new Point( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
    this.dragingStartTime = new Date;
    this.scrollYStart = this.scrollY;
  }

  onMove( event: MouseEvent ){
    event.preventDefault();
    if( this.draging ){
      this.scrollY = ( event.clientY - this.draging.y ) / Application.settings.scale + this.scrollYStart;
      this.moving = new Point( event.clientX, event.clientY );
    }
  }

  onTouchMove( event: TouchEvent ){
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    if( this.draging ){
      this.scrollY = ( event.changedTouches[0].clientY - this.draging.y ) / Application.settings.scale + this.scrollYStart;
      this.moving = new Point( event.changedTouches[0].clientX, event.changedTouches[0].clientY );
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
    clearTimeout( this.checkLoadingId );
  }

  checkLoading(){
    console.log("checkLoading")
    if(!this.machines.length){
      this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
      return;
    }
    this.checkLoadingTimeout --;
    if( this.checkLoadingTimeout <= 0 ) this.loadingSV.loading( 2 );
    for( var i: number = 0; i < this.pageSize && i < this.machines.length; i++ ){
      console.log(this.machines[i].imgLoaded)
      if( !this.machines[i].imgLoaded ){
        this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
        return;
      }
    }
    this.loadingSV.loading( 2 );
  }

  loadMoreGoods(){
    if( this.pageSize >= this.machines.length ) this.loadMoreMachineDataFromNetInterface();
    else{
      let newPageSize: number = this.pageSize + 4;
      this.pageSize = Math.min( this.machines.length, newPageSize );
      this.loadingSV.loading( 1 );
      this.checkLoadingId = setTimeout( this.checkLoading.bind( this ), 1000 );
      this.checkLoadingTimeout = 6;
    }
  }

  loadMoreMachineDataFromNetInterface(){
    //load more machine data from php network interface
  }
}
