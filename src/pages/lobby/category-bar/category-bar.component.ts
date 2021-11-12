import { UIFromParent, Point, BitmapData, Tween, Rectangle, Application, DragEntity } from '../../../basicUI/basic-ui.module';
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

  @ViewChild('carousel', {static: true}) carousel!: ElementRef;
  dragElement!: DragEntity;

  @Output() categoryChange: EventEmitter<number> = new EventEmitter<number>();

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

    Trigger.categoryCallback = this.moveAndChange.bind(this);

    this.dragElement = new DragEntity( this.carousel.nativeElement );
  }

  ngOnDestroy(){
    Trigger.categoryCallback = null;
    this.dragElement?.onDestroy();
  }

  moveAndChange( categoryId: number ){
    if( categoryId == this.categoryId ) return;
    for( let i: number = 1; i < 15; i++ ){
      if( Number( this.showingIcons[i].score_class_id ) == categoryId ){
        Tween.to( this.dragElement, 0.3, { styleLeft: this.dragElement.styleLeft - i * 160 }, 0, this.reolderCategoryIcons.bind( this ) );
        this.lastLoopMoveStartTime = Application.getTimer();
        break;
      }
      else if( Number( this.showingIcons[15-i].score_class_id ) == categoryId ){
        Tween.to( this.dragElement, 0.3, { styleLeft: this.dragElement.styleLeft + i * 160 }, 0, this.reolderCategoryIcons.bind( this ) );
        this.lastLoopMoveStartTime = Application.getTimer();
        break;
      }
    }
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
    this.categoryChange.emit( categoryId );
    this.categoryIconReolderAfterMove( categoryId );
  }

  changeCategory( event: Point ){
    let index: number = Math.floor( ( event.x + 25 ) / 160 );
    index -= 2;
    Tween.to( this.dragElement, 0.3, { styleLeft: this.dragElement.styleLeft - index * 160 }, 0, this.reolderCategoryIcons.bind( this ) );
    this.lastLoopMoveStartTime = Application.getTimer();
  }

  iconPosition( index: number ): number{
    if( index < 8 ) return index * 160 + 300;
    else return index * 160 - 2100;
  }

  dargStatusChange( state: number ){
    if( !this.isDraging && state == 0 && Application.getTimer() - this.lastLoopMoveStartTime >= 300 ){
      this.isDraging = true;
    }
    if( isNaN( state ) ){
      if( this.isDraging ){
        if( Application.getTimer() - this.lastLoopMoveStartTime >= 300 ){
          Tween.to( this.dragElement, 0.3, { styleLeft: Math.round( this.dragElement.styleLeft / 160 ) * 160 }, 0, this.reolderCategoryIcons.bind( this ) );
          this.lastLoopMoveStartTime = Application.getTimer();
        }
      }
      this.isDraging = false;
    }
    if( this.isDraging ){
      this.dragElement.styleLeft = state;
    }
  }

  reolderCategoryIcons(){
    let currentIndex: number = this.getCurrentCategoryIndex( this.categoryId );
    let moved: number = Math.round( this.dragElement.styleLeft / 160 );
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
    this.dragElement.styleLeft = 0;
  }
}
