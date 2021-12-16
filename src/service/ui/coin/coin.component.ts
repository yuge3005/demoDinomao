import { SimpleMovieClipComponent } from '../../../basicUI/basic-ui.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 15:59:31
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 10:57:05
 */
import { Component, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent extends SimpleMovieClipComponent {

	constructor() {
		super();

		this.movieClipData = "assets/coinsAnimation/coins.png";
	}

	ngOnChanges(changes: SimpleChanges): void {
		if( this.movieClip ){
		  this.movieClip.positionChange = this.resetPosition.bind( this );
		  this.movieClip.setFrame = this.setCurrentFrame.bind( this );
		  this.movieClip.setTransform = this.resetTransform.bind( this );
		  if( this.movieClip.position ){
			this.resetPosition();
			this.resetTransform();
		  }
		}
	}
}
