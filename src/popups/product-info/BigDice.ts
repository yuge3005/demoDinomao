/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-16 14:44:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 14:55:01
 */
import { MovieClip, Point } from '../../basicUI/basic-ui.module';

export class BigDice extends MovieClip{
    startPosition!: Point;
	endPosition!: Point;
    middlePosition!: Point;
    
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
		this.setPosition( x, y );
	}
}
