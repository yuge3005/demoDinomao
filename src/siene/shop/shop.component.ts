/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-01 17:54:02
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-06 16:37:05
*/
import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UIComponent, BitmapData, Application, Point } from './../../basicUI/basic-ui.module';
import { MainPage, Trigger, Loading, ModalCommands } from './../../service/dinomao-game.module';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent extends UIComponent implements MainPage, OnDestroy {
  pageHeight: number = 0;
  
  bankItemDatas!: any[];

  showCoinShop: boolean = true;

  coinBg!: BitmapData;
  coinIcon!: BitmapData;
  ticketBtn!: BitmapData;
  ticketBg!: BitmapData;
  coinBtn!: BitmapData;
  ticketIcon!: BitmapData;

  vipIcon!: BitmapData;

  private pl!: HTMLElement | null;

  private draging: Point | null = null;
  private moving: Point | null = null;
  private dragingStartTime!: Date;
  private scrollYStart: number = 0;
  
  private _scrollY: number = 0;
  get scrollY(): number{
    return this._scrollY;
  }
  set scrollY( value: number ){
    let minY: number = - 6 * 185 + this.pageHeight - 660;
    if( value < minY ) value = minY;
    if( value > 0 ) value = 0;
    this._scrollY = value;
  }

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/bank/bank.json";
  }

  initUI(){
    Loading.status = 2;

    this.coinBg = this.textureData.getTexture( "bg1" );
    this.coinIcon = this.textureData.getTexture( "COINS1", 88, 0 );
    this.ticketBtn = this.textureData.getTexture( "TICKETS1", 380, 0 );
    this.ticketBg = this.textureData.getTexture( "bg2" );
    this.coinBtn = this.textureData.getTexture( "COINS2", 88, 0 );
    this.ticketIcon = this.textureData.getTexture( "TICKETS2", 374, 0 );

    this.vipIcon = this.textureData.getTexture( "vip  pass", 10, 71 );

    this.bankItemDatas = Trigger.bankData;

    this.pl = document.getElementById( "productsBar" );
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
  }

  onItemClick( itemData: any ){
    if( new Date().getTime() - this.dragingStartTime.getTime() > 200 ) return;
    if( !this.draging ) return;
    if( this.draging && this.moving && Point.distance( this.moving, this.draging ) > 10 ) return;
    Trigger.modalCommand( ModalCommands.BUY_BANK, itemData );
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
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    this.scrollY += -event.deltaY;
  }

  setHeight( height: number ){
    this.pageHeight = height;
  }

  setData( data: any ){
  }

  switchShop( isCoin: boolean ){
    this.showCoinShop = !isCoin;
  }

  showVip(){
    Trigger.openSubscription();
  }
}
