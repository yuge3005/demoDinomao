import { Rectangle, Point, BitmapData, Application } from './../../basicUI/basic-ui.module';
import { HttpClient } from '@angular/common/http';
import { MainPage, Loading, WebPages, Trigger } from '../../service/dinomao-game.module';
import { Component, ViewChild, ElementRef } from '@angular/core';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-14 13:31:19
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-20 10:17:07
 */

@Component({
  selector: 'app-start-up',
  templateUrl: './start-up.component.html',
  styleUrls: ['./start-up.component.css']
})
export class StartUpComponent extends MainPage {

  tipPages!: BitmapData[];
  nextBtn!: BitmapData;
  startBtn!: BitmapData;
  targetLeft: number = 0;
  carouselCount: number = 0;
  
  activeIndexPosition!: Rectangle;

  pageRect!: Rectangle;
  isDraging: boolean = false;

  getBtnUI( index: number ){
    if( index < this.tipPages.length - 1 ) return this.nextBtn;
    else return this.startBtn;
  }

  @ViewChild('startPageEntity', {static: true}) startPageEntity!: ElementRef;
  private lastDragState: number = 0;

  constructor(public http: HttpClient ) {
    super(http);
    this.textureUrl = "assets/start_up/start_up.json";
  }

  initUI() {
    Loading.status = 2;

    this.tipPages = [];
    this.tipPages[0] = this.textureData.getTexture( "bg1", 6, 406 );
    this.tipPages[1] = this.textureData.getTexture( "bg2", 6, 406 );
    this.tipPages[2] = this.textureData.getTexture( "bg3", 6, 406 );
    this.tipPages[3] = this.textureData.getTexture( "bg4", 6, 406 );
    this.nextBtn = this.textureData.getTexture( "btn_next", 184, 938 );
    this.startBtn = this.textureData.getTexture( "btn_start", 184, 938 );
    this.activeIndexPosition = new Rectangle().init( 75, this.pageHeight - 100, 600, 15 );
    this.pageRect = new Rectangle().init( 0, 0, 750, this.pageHeight );
  }

  onClick( pt: Point ){
    let clickOnButton: boolean = this.pointOnButton( pt );
    if( clickOnButton ){
      if( this.carouselCount < this.tipPages.length - 1 ) this.setCarouselState( this.carouselCount + 1 );
      else Trigger.gotoPage( WebPages.LOBBY );
    }
  }

  pointOnButton( pt: Point ): boolean{
    let ptRect: Rectangle = new Rectangle().init( 234, (this.pageHeight - 1124) * 0.5 + 938, 282, 98 );
    if( ptRect.containsPoint( pt ) ) return true;
    return false;
  }

  dargStatusChange( state: number ){
    if( state == 0 ){
      this.isDraging = true;
    }
    if( isNaN( state ) ){
      if( this.isDraging ){
        if( Math.abs(this.lastDragState) < Application.settings.stageWidth * 0.5 ){
          this.setCarouselState( this.carouselCount );
        }
        else{
          if( this.lastDragState < 0 ){
            this.setCarouselState( this.carouselCount + 1 );
          }
          else{
            this.setCarouselState( this.carouselCount - 1 );
          }
        }
      }
      this.isDraging = false;
    }
    if( this.isDraging ){
      if( this.carouselCount == this.tipPages.length - 1 ){
        if( state < 0 ) state = 0;
      }
      let targetLeft: number = state -750 * this.carouselCount;
      if( targetLeft > 0 ) targetLeft = 0;
      this.targetLeft = targetLeft;
      this.startPageEntity.nativeElement.style.left = this.targetLeft + "px";
      this.lastDragState = this.targetLeft + 750 * this.carouselCount;
    }
  }
  
  setCarouselState(value: number){
    this.carouselCount = value;
    let targetLeft = -750 * value;
    if( targetLeft != this.targetLeft ) {
      this.targetLeft = targetLeft;
      this.startPageEntity.nativeElement.style.left = targetLeft + "px";
    }
  }
}
