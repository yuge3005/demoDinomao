import { UIFromParent, Point, BitmapData, Rectangle, DragEntity } from '../../../basicUI/basic-ui.module';
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

  carouselCount: number = 0;

  @ViewChild('carousel', {static: true}) carousel!: ElementRef;
  dragElement!: DragEntity;

  @Output() categoryChange: EventEmitter<number> = new EventEmitter<number>();

  private isDraging: boolean = false;

  constructor() { 
    super();
  }

  initUI(){
    this.iconListBg = this.textureData.getTexture( "entrance_bg", 0, -9 );
    this.iconListMask = this.textureData.getTexture( "Mask", 0, -14 );
    this.bannerHr = this.textureData.getTexture( "1", 0, -23 );

    this.touchBarRect = new Rectangle().init( 0, 0, 750, 135 );

    Trigger.categoryCallback = this.moveAndChange.bind(this);

    this.dragElement = new DragEntity( this.carousel.nativeElement );
  }

  ngOnDestroy(){
    Trigger.categoryCallback = null;
    this.dragElement?.onDestroy();
  }

  moveAndChange( categoryId: number ){
    if( categoryId == this.categoryId ) return;
    for( let i: number = 1; i < this.categoryList.length; i++ ){
      let index: number = ( this.carouselCount + this.categoryList.length + i ) % this.categoryList.length;
      if( Number( this.categoryList[index].score_class_id ) == categoryId ){
        this.dragElement.moveTo( - i * 160, this.reolderCategoryIcons.bind( this ) );
        break;
      }
      index = ( this.carouselCount + this.categoryList.length - i ) % this.categoryList.length;
      if( Number( this.categoryList[index].score_class_id ) == categoryId ){
        this.dragElement.moveTo( i * 160, this.reolderCategoryIcons.bind( this ) );
        break;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges( changes );

    if( changes.categoryList && this.categoryList ){
      this.showingIcons = this.dragElement.setDatas( this.categoryList, 7, 7, 0 );
      this.gotoCategory( Number( this.categoryList[0].score_class_id ) );
    }
  }

  gotoCategory( categoryId: number ){
    if( this.categoryId == categoryId ) return;
    this.categoryId = categoryId;
    this.categoryChange.emit( categoryId );
  }

  changeCategory( event: Point ){
    let index: number = Math.floor( ( event.x + 25 ) / 160 );
    index -= 2;
    if( index == 0 ) return;
    this.dragElement.moveTo( - index * 160, this.reolderCategoryIcons.bind( this ) );
  }

  dargStatusChange( state: number ){
    if( !this.isDraging && state == 0 && !this.dragElement.isSlipping ){
      this.isDraging = true;
    }
    if( isNaN( state ) ){
      if( this.isDraging && !this.dragElement.isSlipping ){
        this.dragElement.moveTo( Math.round( this.dragElement.styleLeft / 160 ) * 160, this.reolderCategoryIcons.bind( this ) );
      }
      this.isDraging = false;
    }
    if( this.isDraging ){
      this.dragElement.styleLeft = state;
    }
  }

  reolderCategoryIcons(){
    let moved: number = Math.round( this.dragElement.styleLeft / 160 );
    this.carouselCount = ( this.carouselCount + this.categoryList.length - moved ) % this.categoryList.length;
    this.showingIcons = this.dragElement.resetCurrentIndex( this.carouselCount );
    this.gotoCategory( Number( this.categoryList[this.carouselCount].score_class_id ) );
  }
}
