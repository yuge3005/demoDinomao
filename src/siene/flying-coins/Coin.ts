import { Point, SimpleMovieClip } from 'resize-able-ui';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 14:10:59
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:38:01
 */
export class Coin extends SimpleMovieClip {

	public constructor() {
		super( 'assets/coinsAnimation/coins.png', 'assets/coinsAnimation/coins.json' );
	}

	setTexture( textruePic: string, textureJson: string ){
		this.textruePic = textruePic;
		this.textureJson = textureJson;
		this.textureData = JSON.parse( '{"duration":2,"width":180,"height":180,"frames":[{"x":0,"y":0},{"x":180,"y":0},{"x":360,"y":0},{"x":0,"y":180},{"x":180,"y":180},{"x":360,"y":180}]}' );

		this.afterGetTexture();
	}
}