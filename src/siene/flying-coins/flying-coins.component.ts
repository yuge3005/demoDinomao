/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-30 16:11:04
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:20:52
*/
import { Component, Input, OnInit } from '@angular/core';
import { Point, SoundManager, Tween } from '../../basicUI/basic-ui.module';
import { Trigger } from '../../service/dinomao-game.module';
import { Coin } from './Coin';

@Component({
  selector: 'app-flying-coins',
  templateUrl: './flying-coins.component.html'
})
export class FlyingCoinsComponent implements OnInit {

    @Input() mainHeight!: number;

    private coinsFly: Coin[];
    coinShowing: Coin[];

    startPosition!: Point;
    endPosition!: Point;
    middlePosition!: Point;
    startScale!: number;
    endScale!: number;
    middleScale!: number;
  
    private gapDuration: number = 65;
  
    constructor() {
      this.coinsFly = [];
      this.coinShowing = [];
    }

    ngOnInit(){
      Trigger.fly = this.fly.bind( this );
    }
  
    public fly( coinsCount: number, startPosition: Point, endPosition: Point, middlePosition: Point, startScale: number, endScale: number, middleScale: number ){
      this.coinsFly.length = 0;
      for( let i: number = 0; i < coinsCount; i++ ) this.coinsFly[i] = new Coin();

      this.savePositions( startPosition, endPosition, middlePosition, startScale, endScale, middleScale );
      this.startFly();
      
      SoundManager.play( "assets/sound/collect_coins.mp3" );
    }
  
    private savePositions( startPosition: Point, endPosition: Point, middlePosition: Point, startScale: number, endScale: number, middleScale: number ){
      this.startPosition = startPosition;
      this.endPosition = endPosition;
      this.middlePosition = middlePosition;
      this.startScale = startScale;
      this.endScale = endScale;
      this.middleScale = middleScale;
    }
  
    private startFly(){
      if( !this.coinsFly.length )return;
      let coin: Coin | undefined = this.coinsFly.shift();
      if( coin ){
        coin.startPosition = this.startPosition;
        coin.setPosition( this.startPosition.x, this.startPosition.y );
        coin.endPosition = this.endPosition;
        coin.middlePosition = this.middlePosition;
        coin.startScale = this.startScale;
        coin.scaleX = coin.scaleY = coin.startScale;
        coin.endScale = this.endScale;
        coin.middleScale = this.middleScale;
        coin.rotation = Math.random()*360;
        coin.gotoAndPlay(Math.floor(Math.random()*coin.totalFrames+1));
        Tween.to( coin, 1.2, { factor: 1 }, 0, this.endFly.bind( this, coin ) );
        setTimeout( this.startFly.bind( this ), this.gapDuration );
        this.coinShowing.push( coin );
      }
    }
  
    private endFly( coin: Coin ){
      coin.stop();
      this.coinShowing.splice( this.coinShowing.indexOf(coin), 1 );
    }
  }