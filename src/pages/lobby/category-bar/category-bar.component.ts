import { Application } from './../../../basicUI/settings/Application';
import { trace } from './../../../service/gameUILogic/trace';
import { UIFromParent, Point, BitmapData, Tween, Rectangle } from '../../../basicUI/basic-ui.module';
import { Component, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Trigger, CategoryData } from '../../../service/dinomao-game.module';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent extends UIFromParent {

  @Input() categoryList!: CategoryData[];
  showingIcons!: CategoryData[];
  categoryId: number = 0;

  iconListBg!: BitmapData;
  iconListMask!: BitmapData;
  bannerHr!: BitmapData;

  touchBarRect!: Rectangle;

  private carouselState: number = 0;

  @ViewChild('carousel', {static: true}) carousel!: ElementRef;

  @Output() categoryChange: EventEmitter<number> = new EventEmitter<number>();

  private _styleLeft: number = 0;
  set styleLeft( value: number ){
    this._styleLeft = value;
    if( this.carousel ) this.carousel.nativeElement.style.left = value + "px";
  }
  get styleLeft(): number{
    return this._styleLeft;
  }

  categoryMovingLeft = false;

  private lastLoopMoveStartTime: number = 0;
  private isDraging: boolean = false;

  constructor() { 
    super();
  }

  initUI(){
    this.iconListBg = this.textureData.getTexture( "entrance_bg", 0, -9 );
    this.iconListMask = this.textureData.getTexture( "Mask", 0, -14 );
    this.bannerHr = this.textureData.getTexture( "1", 0, -23 );

    this.touchBarRect = new Rectangle().init( 0, 0, 750, 135 );

    Trigger.categoryCallback = this.gotoCategory.bind(this);
    eval( "document.changeCategory=this.gotoCategory.bind(this)" );
  }

  ngOnDestroy(){
    Trigger.categoryCallback = null;
    eval( "document.changeCategory=null" );
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );

    if( changes.categoryList && this.categoryList ){
      this.gotoCategory( Number( this.categoryList[0].score_class_id ) );
    }
  }

  buildShowingIcons(){
    this.showingIcons = [];
    for( let i: number = 0; i < 15; i++ ){
      if( i < 8 ) this.showingIcons[i] = this.categoryList[i%this.categoryList.length];
      else{
        let n: number = this.categoryList.length + i - 15;
        if( n < 0 ) n += this.categoryList.length;
        this.showingIcons[i] = this.categoryList[n];
      }
    }
  }

  gotoCategory( categoryId: number ){
    if( this.categoryId == categoryId ) return;
    this.categoryId = categoryId;
    this.categoryChange.emit( categoryId );
    this.categoryIconReolderAfterMove( categoryId );
  }

  changeCategory( event: Point ){
    let index: number = Math.floor( ( event.x + 25 ) / 160 );
    index -= 2;
    Tween.to( this, 0.3, { styleLeft: this.styleLeft - index * 160 }, 0, this.reolderCategoryIcons1.bind( this ) );
    this.lastLoopMoveStartTime = Application.getTimer();
  }

  iconPosition( index: number ): number{
    if( index < 8 ) return index * 160 + 300;
    else return index * 160 - 2100;
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

  dargStatusChange( state: number ){
    if( !this.isDraging && state == 0 && Application.getTimer() - this.lastLoopMoveStartTime >= 300 ){
      this.isDraging = true;
    }
    if( isNaN( state ) ){
      if( this.isDraging ){
        if( Application.getTimer() - this.lastLoopMoveStartTime >= 300 ){
          Tween.to( this, 0.3, { styleLeft: Math.round( this.styleLeft / 160 ) * 160 }, 0, this.reolderCategoryIcons1.bind( this ) );
          this.lastLoopMoveStartTime = Application.getTimer();
        }
      }
      this.isDraging = false;
    }
    if( this.isDraging ){
      this.styleLeft = state;
    }
  }

  reolderCategoryIcons1(){
    let currentIndex: number = this.getCurrentCategoryIndex( this.categoryId );
    let moved: number = Math.round( this.styleLeft / 160 );
    currentIndex -= moved;
    let newIndex: number = ( currentIndex + this.categoryList.length ) % this.categoryList.length;
    let categoryId: number = Number( this.categoryList[newIndex].score_class_id );
    this.gotoCategory( categoryId );
  }

  private getCurrentCategoryIndex( categoryId: number ): number{
    let currentIndex: number = -1;
    for( let i: number = 0; i < this.categoryList.length; i++ ){
      if( Number( this.categoryList[i].score_class_id ) == categoryId ){
        currentIndex = i;
        break;
      }
    }
    return currentIndex;
  }

  private categoryIconReolderAfterMove( categoryId: number ){
    this.showingIcons = [];
    let currentIndex: number = this.getCurrentCategoryIndex( categoryId );
    for( let i: number = 0; i < 15; i++ ){
      if( i < 8 ) this.showingIcons[i] = this.categoryList[(i+currentIndex)%this.categoryList.length];
      else{
        let n: number = this.categoryList.length + (i+currentIndex) - 15;
        n += this.categoryList.length * 6;
        n %= this.categoryList.length;
        this.showingIcons[i] = this.categoryList[n];
      }
    }
    this.styleLeft = 0;
  }
}
