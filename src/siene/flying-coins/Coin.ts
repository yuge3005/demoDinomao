import { Point, SimpleMovieClip } from '../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 14:10:59
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-17 10:31:34
 */
export class Coin extends SimpleMovieClip {

	startPosition!: Point;
	endPosition!: Point;
	middlePosition!: Point;
	startScale!: number;
	endScale!: number;
    middleScale!: number;

	public constructor() {
		super( 'assets/coinsAnimation/coins.png', 'assets/coinsAnimation/coins.json' );
	}

	setTexture( textruePic: string, textureJson: string ){
		this.textruePic = textruePic;
		this.textureJson = textureJson;
		this.textureData = JSON.parse( '{"duration":2,"width":180,"height":180,"frames":[{"x":0,"y":0},{"x":180,"y":0},{"x":360,"y":0},{"x":0,"y":180},{"x":180,"y":180},{"x":360,"y":180}]}' );

		this.afterGetTexture();
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