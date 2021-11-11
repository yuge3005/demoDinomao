/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-11 16:52:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 17:53:44
 */
export class DragEntity {

    private entity!: HTMLDivElement;

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

    constructor( entity: HTMLDivElement ){
        this.entity = entity;
    }

    setDatas( items: any[], afterIndex: number, beforeIndex: number, currentIndex: number = 0 ): any[]{
        this.items = items;
        this.afterIndex = afterIndex;
        this.beforeIndex = beforeIndex;
        this.currentIndex = currentIndex;
        return this.getShowingItems();
    }

    getShowingItems(): any[]{
        let showingItems: any[] = [];
        for( let i: number = this.currentIndex; i <= this.currentIndex + this.afterIndex; i++ ){
            showingItems.push( this.items[i] );
        }
        let lastIndex: number = this.currentIndex + this.items.length * 10;
        for( let i: number = lastIndex - 1; i >= lastIndex - this.beforeIndex; i-- ){
            let index: number = i % this.items.length;
            showingItems.unshift( this.items[index] );
        }
        return showingItems;
    }
}
