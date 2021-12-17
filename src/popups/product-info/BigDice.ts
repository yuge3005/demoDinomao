/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-16 14:44:54
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-17 10:48:01
 */
import { MovieClip, Point, MovieClipDataFactory } from 'resize-able-ui';

export class BigDice extends MovieClip{
    startPosition!: Point;
	endPosition!: Point;
    middlePosition!: Point;

    constructor(){
        super( new MovieClipDataFactory( "assets/mc/pipa_dice.png", "assets/mc/pipa_dice.json" ).getMovieClipData( "dice" ) );
    }
    
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
