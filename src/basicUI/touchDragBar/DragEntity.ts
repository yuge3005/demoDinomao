import { Application } from '../settings/Application';
import { Tween } from '../tween/Tween';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-11 16:52:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-15 15:53:26
 */
export class DragEntity {

    private entity: HTMLDivElement;
    private itemGap: number;

    private _styleLeft: number = 0;
    set styleLeft( value: number ){
      this._styleLeft = value;
      if( this.entity ) this.entity.style.left = value + "px";
    }
    get styleLeft(): number{
      return this._styleLeft;
    }

    items!: any[];
    afterIndex: number = 0;
    beforeIndex: number = 0;
    currentIndex: number = 0;

    slipDuration: number = 0.3;
    private lastLoopMoveStartTime: number = 0;
    isDraging: boolean = false;

    get isSlipping(){
        return Application.getTimer() - this.lastLoopMoveStartTime < this.slipDuration * 1000;
    }

    constructor( entity: HTMLDivElement, itemGap: number ){
        this.entity = entity;
        this.itemGap = itemGap;
    }

    setDatas( items: any[], afterIndex: number, beforeIndex: number, currentIndex: number = 0 ): any[]{
        this.items = items;
        this.afterIndex = afterIndex;
        this.beforeIndex = beforeIndex;
        this.currentIndex = currentIndex;
        return this.getShowingItems();
    }

    resetCurrentIndex( currentIndex: number = 0 ): any[]{
        this.currentIndex = currentIndex;
        this.styleLeft = 0;
        return this.getShowingItems();
    }

    getShowingItems(): any[]{
        let showingItems: any[] = [];
        for( let i: number = this.currentIndex; i <= this.currentIndex + this.afterIndex; i++ ){
            let index: number = i % this.items.length;
            showingItems.push( this.items[index] );
        }
        let lastIndex: number = this.currentIndex + this.items.length * 10;
        for( let i: number = lastIndex - 1; i >= lastIndex - this.beforeIndex; i-- ){
            let index: number = i % this.items.length;
            showingItems.unshift( this.items[index] );
        }
        return showingItems;
    }

    onDestroy(){
        Tween.kill( this );
    }

    moveTo( offsetX: number, callback?: Function ){
        Tween.to( this, this.slipDuration, { styleLeft: offsetX }, 0, callback );
        this.lastLoopMoveStartTime = Application.getTimer();
    }

    move( moveIndex: number, callback?: Function ){
        this.moveTo( - moveIndex * this.itemGap, callback );
    }

    getNewIndexByOffsetIndex( offsetIndex: number ): number{
        return ( this.currentIndex + this.items.length + offsetIndex ) % this.items.length;
    }

    getState( state: number ): boolean{
        if( state == 0 && !this.isDraging && !this.isSlipping ){
            this.isDraging = true;
            return true;
        }
        if( this.isDraging ) this.styleLeft = state;
        return false;
    }

    dragEnd( callback: Function ): boolean{        
        let isDraging: boolean = false;
        if( this.isDraging && !this.isSlipping ){
            if( Math.abs( this.styleLeft ) <= this.itemGap * 0.5 ) this.moveTo( 0 );
            else this.moveTo( Math.round( this.styleLeft / this.itemGap ) * this.itemGap, callback );
            isDraging = true;
        }
        this.isDraging = false;
        return isDraging;
    }
}
