/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-11 16:52:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-11 16:57:01
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

    constructor( entity: HTMLDivElement ){
        this.entity = entity;
    }
}
