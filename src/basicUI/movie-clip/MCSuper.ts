import { Point } from "../geom/point";

/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-16 15:35:34
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 16:03:53
 */
export class MCSuper {

    positionChange: Function | null = null;
    setFrame: Function | null = null;
    setTransform: Function | null = null;

    position: Point = new Point;
    
    _scaleX: number = 1;
    set scaleX( value: number ){
        if( isNaN( value ) ) return;
        this._scaleX = value;
        this.transformChange();
    }
    get scaleX(): number{
        return this._scaleX;
    }
    
    _scaleY: number = 1;
    set scaleY( value: number ){
        if( isNaN( value ) ) return;
        this._scaleY = value;
        this.transformChange();
    }
    get scaleY(){
        return this._scaleY;
    }

    _rotation: number = 0;
    set rotation( value: number ){
        if( isNaN( value ) ) return;
        this._rotation = value;
        this.transformChange();
    }
    get rotation(){
        return this._rotation;
    }
    
    private transformChange(){
        if( this.setTransform ) this.setTransform();
        else setTimeout( this.transformChange.bind( this ), 35 );
    }

    setPosition( x: number, y: number ){
        this.position = new Point().init( x, y );
        if( this.positionChange ) this.positionChange();
    }

    get x(): number{
        return this.position.x;
    }
    set x( value: number ){
        if( value != this.position.x ){
            this.position.x = value;
            if( this.positionChange ) this.positionChange();
        }
    }

    get y(): number{
        return this.position.y;
    }
    set y( value: number ){
        if( value != this.position.y ){
            this.position.y = value;
            if( this.positionChange ) this.positionChange();
        }
    }

    dispose(){}
}
