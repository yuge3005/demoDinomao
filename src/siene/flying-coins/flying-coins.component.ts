/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-08-30 16:11:04
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-31 10:32:23
*/
import { Component, OnInit } from '@angular/core';
import { Point } from '../../basicUI/basic-ui.module';
import { Coin } from '../../service/dinomao-game.module';
import { SoundManager } from './../../basicUI/sound/SoundManager';

@Component({
  selector: 'app-flying-coins',
  templateUrl: './flying-coins.component.html',
  styleUrls: ['./flying-coins.component.css']
})
export class FlyingCoinsComponent implements OnInit {
    private coinsMcs: Coin[];
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
      this.coinsMcs = [];
      this.coinsFly = [];
      this.coinShowing = [];
    }

    ngOnInit(){
      this.fly( 10, new Point().init( 500, 800 ), new Point().init( 200, 50 ), new Point().init( 0, 1200 ), 0.3, 0.5, 0.2 );
    }
  
    public fly( coinsCount: number, startPosition: Point, endPosition: Point, middlePosition: Point, startScale: number, endScale: number, middleScale: number ){
      while( this.coinsMcs.length < coinsCount )this.coinsMcs.push( new Coin() );
      this.coinsFly.length = 0;
      for( let i: number = 0; i < coinsCount; i++ ) this.coinsFly[i] = this.coinsMcs[i];

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
        coin.moveTimeLeft = 800;
        coin.moveStartTime = new Date();
        setInterval( this.coinFlying.bind( this ), 33, coin );
        setTimeout( this.startFly.bind( this ), this.gapDuration );
        this.coinShowing.push( coin );
      }
    }

    private coinFlying( coin: Coin ){
      
    }
  
    private endFly( coin: Coin ){
      coin.stop();
    }
  }