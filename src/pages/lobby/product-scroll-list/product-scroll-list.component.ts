/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-09-07 10:44:16
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-08 09:59:16
*/
import { Component, Input } from '@angular/core';
import { Point, ScrollList } from 'resize-able-ui/lib/basic-ui.module';
import { Trigger, WebPages } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-product-scroll-list',
  templateUrl: './product-scroll-list.component.html',
  styleUrls: ['./product-scroll-list.component.css']
})
export class ProductScrollListComponent extends ScrollList {

  @Input()pageSize: number = 0;

  minY(): number{
    return - Math.ceil( Math.min( this.listData.length, this.pageSize ) / 2 ) * 425 + this.listHeight - 30;
  }

  longPressTimeoutId: any;
  longPressItemDataIndex: number = -1;

  constructor() {
    super();
  }

  onWheel( event: WheelEvent ){
    if( Trigger.hasPopup ) return;
    super.onWheel( event );
  }

  onItemClick( itemData: any ): boolean{
    let isClick: boolean = super.onItemClick( itemData );
    if( isClick ) Trigger.gotoPage( WebPages.VIDEO, itemData );
    return isClick;
  }

  onTouchStart( event: TouchEvent ): void{
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    super.onTouchStart( event );
    
    this.longPressTimeoutId = setTimeout( this.longPressCheck.bind( this ), 1000 );
    this.getItemDataIndex( event.target as HTMLDivElement );
  }

  getItemDataIndex( div: HTMLDivElement ){
    let parent: HTMLDivElement = div.parentElement as HTMLDivElement;
    let data: any = parent.getAttribute( "itemdata" );
    if( data ) this.longPressItemDataIndex = Number( data );
  }

  onTouchMove( event: TouchEvent ){
    event.preventDefault();
    if( event.touches.length > 1 ) return;
    super.onTouchMove( event );
    
    if( this.longPressTimeoutId && this.moving && this.draging && Point.distance( this.moving, this.draging ) > 3 ) this.longPressCheckEnd();
  }

  stopDrag(){
    super.stopDrag();
    if( this.longPressTimeoutId ) this.longPressCheckEnd();
  }

  ngOnDestroy(){
    super.ngOnDestroy();
    if( this.longPressTimeoutId ) this.longPressCheckEnd();
  }

  longPressCheck(){
    this.stopDrag();
    this.longPress();
  }

  longPressCheckEnd(){
    clearTimeout( this.longPressTimeoutId );
    this.longPressTimeoutId = null;
  }

  longPress(){
    Trigger.popupManager.showProductInfo( this.listData[this.longPressItemDataIndex] )
  }
}
