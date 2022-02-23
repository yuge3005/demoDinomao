import { DisplayObject } from '../ui/displayObject';
import { Tween } from './Tween';
import { Point } from '../geom/point';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2022-01-23 09:42:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-23 09:42:55
 */
export class Bessel{

    target!: DisplayObject;
    startPosition!: Point;
    endPosition!: Point;
    middlePosition!: Point;

    startScale: number = 1;
    endScale: number = 1;
    middleScale: number = 1;

    scaleChange: boolean = false;

    public get factor():number {
		return 0;
    }
    
    public set factor(value:number) {
		let bar: number = 1 - value;
		let barSq: number = bar * bar;
		let valueSq: number = value * value;
		let valueTimesBar2: number = 2 * value * bar; 
		let x: number = barSq * this.startPosition.x + valueTimesBar2 * this.middlePosition.x + valueSq * this.endPosition.x;
        let y: number = barSq * this.startPosition.y + valueTimesBar2 * this.middlePosition.y + valueSq * this.endPosition.y;
        let target: DisplayObject = this.target;
        target.setPosition( x, y );
        if( this.scaleChange ) target.scaleX = target.scaleY = barSq * this.startScale + valueTimesBar2 * this.middleScale + valueSq * this.endScale;
	}

    constructor( target: DisplayObject, duration: number, startPosition: Point, endPosition: Point, middlePosition: Point, startScale: number,
        endScale: number, middleScale: number, onComplete?: Function, ease?: string ){
        this.target = target;
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.middlePosition = middlePosition;
        target.setPosition( startPosition.x, startPosition.y );
        if( startScale != 1 || endScale != 1 || middleScale != 1 ){
            this.scaleChange = true;
            this.startScale = startScale;
            this.middleScale = middleScale;
            this.endScale = endScale;
            target.scaleX = target.scaleY = startScale;
        }
        Tween.to( this, duration, { factor: 1 }, 0, onComplete, ease );
    }
}
