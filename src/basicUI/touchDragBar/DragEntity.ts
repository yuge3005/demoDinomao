import { Application } from '../settings/Application';
import { Tween } from '../tween/Tween';
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-27 17:52:33
 * @description: Drag an object, it needs to be used with the app-touchDragBar componen
 * @ 拖拽物体，需配合app-touchDragBar组件使用
 */
export class DragEntity {

    private entity: HTMLDivElement;
    private itemGap: number;

    private _styleLeft: number = 0;
    /**
     * @memberof DragEntity
     * @description: Horizontal scroll
     * @ 水平滚动量
     */
    set scrollX( value: number ){
      this._styleLeft = value;
      if( this.entity ) this.entity.style.left = value + "px";
    }
    get scrollX(): number{
      return this._styleLeft;
    }

    private items!: any[];
    private afterIndex: number = 0;
    private beforeIndex: number = 0;
    private currentIndex: number = 0;

    private slipDuration: number = 0.3;
    private lastLoopMoveStartTime: number = 0;
    private isDraging: boolean = false;

    /**
     * @readonly
     * @memberof DragEntity
     * @description: if it is during sliping
     * @ 是否在滑动过程中
     */
    get isSlipping(){
        return Application.getTimer() - this.lastLoopMoveStartTime < this.slipDuration * 1000;
    }

    /**
     * Creates an instance of DragEntity.
     * @param {HTMLDivElement} entity draging entity, items container
     * @param {number} itemGap distance between two items
     * @constructor
     */
    constructor( entity: HTMLDivElement, itemGap: number ){
        this.entity = entity;
        this.itemGap = itemGap;
    }

    /**
     * @param {any[]} items
     * @param {number} afterIndex number of showing items after current index
     * @param {number} beforeIndex number of showing items before current index
     * @param {number} [currentIndex=0]
     * @return {*}  {any[]} A new array for show
     * @memberof DragEntity
     * @description: Set the origin array for dragBar. and return a new array for show.
     * @ 为dragBar设置原数组。并返回一个新数组以供显示。
     */
    setDatas( items: any[], afterIndex: number, beforeIndex: number, currentIndex: number = 0 ): any[]{
        this.items = items;
        this.afterIndex = afterIndex;
        this.beforeIndex = beforeIndex;
        this.currentIndex = currentIndex;
        return this.getShowingItems();
    }

    /**
     * @param {number} [currentIndex=0]
     * @return {*}  {any[]}
     * @memberof DragEntity
     */
    resetCurrentIndex( currentIndex: number = 0 ): any[]{
        this.currentIndex = currentIndex;
        this.scrollX = 0;
        return this.getShowingItems();
    }

    private getShowingItems(): any[]{
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

    /**
     *
     *
     * @memberof DragEntity
     */
    dispose(){
        Tween.kill( this );
    }

    private moveTo( offsetX: number, callback?: Function ){
        Tween.to( this, this.slipDuration, { scrollX: offsetX }, 0, callback );
        this.lastLoopMoveStartTime = Application.getTimer();
    }

    /**
     *
     *
     * @param {number} moveIndex
     * @param {Function} [callback]
     * @memberof DragEntity
     */
    move( moveIndex: number, callback?: Function ){
        this.moveTo( - moveIndex * this.itemGap, callback );
    }

    /**
     *
     *
     * @param {number} offsetIndex
     * @return {*}  {number}
     * @memberof DragEntity
     */
    getNewIndexByOffsetIndex( offsetIndex: number ): number{
        return ( this.currentIndex + this.items.length + offsetIndex ) % this.items.length;
    }

    /**
     *
     *
     * @param {number} state
     * @return {*}  {boolean}
     * @memberof DragEntity
     */
    getState( state: number ): boolean{
        if( state == 0 && !this.isDraging && !this.isSlipping ){
            this.isDraging = true;
            return true;
        }
        if( this.isDraging ) this.scrollX = state;
        return false;
    }

    /**
     *
     *
     * @param {Function} callback
     * @return {*}  {boolean}
     * @memberof DragEntity
     */
    dragEnd( callback: Function ): boolean{        
        let isDraging: boolean = false;
        if( this.isDraging && !this.isSlipping ){
            if( Math.abs( this.scrollX ) <= this.itemGap * 0.5 ) this.moveTo( 0 );
            else this.moveTo( Math.round( this.scrollX / this.itemGap ) * this.itemGap, callback );
            isDraging = true;
        }
        this.isDraging = false;
        return isDraging;
    }
}
