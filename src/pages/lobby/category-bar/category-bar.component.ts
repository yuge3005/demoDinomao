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

  constructor() { 
    super();
  }

  initUI(){
    this.iconListBg = this.textureData.getTexture( "entrance_bg", 0, -9 );
    this.iconListMask = this.textureData.getTexture( "Mask", 0, -14 );
    this.bannerHr = this.textureData.getTexture( "1", 0, -23 );

    this.touchBarRect = new Rectangle().init( 0, 0, 750, 135 );

    Trigger.categoryCallback = this.gotoCategory.bind(this);
    eval( "document.changeCategory=this.gotoCategory.bind(this)" )
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

  gotoCategory( categoryId: number ){
    if( this.categoryId == categoryId ) return;
    this.categoryId = categoryId;
    // this.categoryChange.emit( categoryId );
    this.categoryIconMove( categoryId );
  }

  changeCategory( event: Point ){
    let index: number = Math.floor( ( event.x + 25 ) / 160 );
    index -= 2;
    if( index < 0 ) index += this.categoryList.length;
    let categoryId: number = Number( this.categoryList[index].score_class_id );
    this.gotoCategory( categoryId );
  }

  iconPosition( index: number ): number{
    if( index < this.categoryList.length - ( this.categoryMovingLeft ? 4 : 2 ) ) return index * 160 + 300;
    else return ( index - this.categoryList.length ) * 160 + 300;
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
    trace.log( state );
  }
}
