/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-30 16:11:04
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-01 11:21:50
*/
import { Component, OnInit } from '@angular/core';
import { Point, SoundManager } from '../../basicUI/basic-ui.module';
import { Coin, Trigger } from '../../service/dinomao-game.module';

@Component({
  selector: 'app-flying-coins',
  templateUrl: './flying-coins.component.html',
  styleUrls: ['./flying-coins.component.css']
})
export class FlyingCoinsComponent implements OnInit {
    private coinsFly: Coin[];
    coinShowing: Coin[];

    startPosition!: Point;
    endPosition!: Point;
    middlePosition!: Point;
    startScale!: number;
    endScale!: number;
    middleScale!: number;
  
    private gapDuration: number = 33;
  
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
      this.gapDuration = 33;
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
        coin.position = this.startPosition.clone();
        coin.endPosition = this.endPosition;
        coin.middlePosition = this.middlePosition;
        coin.startScale = this.startScale;
        coin.scaleX = coin.scaleY = coin.startScale;
        coin.endScale = this.endScale;
        coin.middleScale = this.middleScale;
        coin.rotation = Math.random()*360;
        coin.gotoAndPlay(Math.floor(Math.random()*coin.totalFrames));
        coin.moveDuration = 800;
        coin.moveStartTime = new Date().getTime();
        let moveIntervalId: any = setInterval( this.coinFlying.bind( this ), 33, coin );
        coin.moveIntervalId = moveIntervalId;
        setTimeout( this.startFly.bind( this ), this.gapDuration );
        this.coinShowing.push( coin );
      }
    }

    private coinFlying( coin: Coin ){
      let passTime: number = new Date().getTime() - coin.moveStartTime;
      if( passTime > coin.moveDuration ){
        clearInterval( coin.moveIntervalId );
        this.endFly( coin );
        this.coinShowing.splice( this.coinShowing.indexOf(coin), 1 );
      }
      coin.factor = passTime / coin.moveDuration;
    }
  
    private endFly( coin: Coin ){
      coin.stop();
    }
  }