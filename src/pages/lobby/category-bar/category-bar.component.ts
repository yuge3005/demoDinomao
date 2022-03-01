import { UIFromParent, Point, Rectangle, DragEntity, StyleX, Transform3D } from '../../../basicUI/basic-ui.module';
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

  touchBarRect!: Rectangle;
  carouselCount: number = 0;

  @ViewChild('carousel', {static: true}) carousel!: ElementRef;
  dragElement!: DragEntity;

  @Output() categoryChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { 
    super();
  }

  initUI(){
    this.ui.iconListBg = this.textureData.getTexture( "entrance_bg", 0, -9 );
    this.ui.iconListMask = this.textureData.getTexture( "Mask", 0, -14 );
    this.ui.bannerHr = this.textureData.getTexture( "1", 0, -23 );

    this.touchBarRect = new Rectangle().init( 0, 0, 750, 135 );

    Trigger.categoryCallback = this.moveAndChange.bind(this);

    this.dragElement = new DragEntity( this.carousel.nativeElement, 160 );

    this.styles.iconParent = Transform3D.container3D( 575, new Point().init( 375, 67 ), true, new Point().init( 750, 134 ) );
    this.styles.icon = StyleX.combine( StyleX.anchorOffset(37,28), StyleX.setItemRect(375,65,75,57) );

    this.styles.mask = StyleX.combine( StyleX.setItemRect(0,0,750,124), StyleX.backgroundColor(0xFFFFFF) );
    this.styles.maskTransform = Transform3D.object3D( new Rectangle().init( 0, 0, 100 ) );
  }

  ngOnDestroy(){
    Trigger.categoryCallback = null;
    this.dragElement?.dispose();
  }

  moveAndChange( categoryId: number ){
    if( categoryId == this.categoryId ) return;
    for( let i: number = 1; i < this.categoryList.length; i++ ){
      let index: number = ( this.carouselCount + this.categoryList.length + i ) % this.categoryList.length;
      if( Number( this.categoryList[index].score_class_id ) == categoryId ){
        this.dragElement.move( i, this.reolderCategoryIcons.bind( this ) );
        break;
      }
      index = ( this.carouselCount + this.categoryList.length - i ) % this.categoryList.length;
      if( Number( this.categoryList[index].score_class_id ) == categoryId ){
        this.dragElement.move( -i, this.reolderCategoryIcons.bind( this ) );
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
    this.dragElement.move( index, this.reolderCategoryIcons.bind( this ) );
  }

  dargStatusChange( state: number | Point ){
    if( state instanceof Point ){
      this.dragElement.dragEnd( this.reolderCategoryIcons.bind( this ) );
    }
    else{
      this.dragElement.getState( state );
    }
  }

  reolderCategoryIcons(){
    let moved: number = Math.round( this.dragElement.scrollX / 160 );
    this.carouselCount = this.dragElement.getNewIndexByOffsetIndex( - moved );
    this.showingIcons = this.dragElement.resetCurrentIndex( this.carouselCount );
    this.gotoCategory( Number( this.categoryList[this.carouselCount].score_class_id ) );
  }
}
