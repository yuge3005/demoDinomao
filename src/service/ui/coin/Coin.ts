import { Point, SimpleMovieClip } from '../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 14:10:59
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 14:52:13
 */
export class Coin extends SimpleMovieClip {

	startPosition!: Point;
	endPosition!: Point;
	middlePosition!: Point;
	startScale!: number;
	endScale!: number;
    middleScale!: number;

    get totalFrames(): number{
        return 6;
    }

	public constructor() {
		super( 'assets/coinsAnimation/coins.png', 'assets/coinsAnimation/coins.json' );
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
		this.scaleX = this.scaleY = barSq * this.startScale + valueTimesBar2 * this.middleScale + valueSq * this.endScale;
	}
}