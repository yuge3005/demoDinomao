import { MovieClipComponent } from 'resize-able-ui';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 15:59:31
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 11:50:38
 */
import { Component, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent extends MovieClipComponent {

	constructor() {
		super();

		this.movieClipTextureUrl = "assets/coinsAnimation/coins.json";
		this.movieClipData = "assets/coinsAnimation/coins.png";
		this.movieClipTexture = JSON.parse( '{"duration":2,"width":180,"height":180,"frames":[{"x":0,"y":0},{"x":180,"y":0},{"x":360,"y":0},{"x":0,"y":180},{"x":180,"y":180},{"x":360,"y":180}]}' );
	}

	ngOnChanges(changes: SimpleChanges): void {
		if( this.movieClip ){
		  this.movieClip.positionChange = this.resetPosition.bind( this );
		  this.movieClip.setFrame = this.setCurrentFrame.bind( this );
		  this.movieClip.setTransform = this.resetTransform.bind( this );
		  this.intervalId = setInterval( this.enterFrame.bind(this), 66 );
		  if( this.movieClip.position ){
			this.resetPosition();
			this.resetTransform();
		  }
		}
	}
}
