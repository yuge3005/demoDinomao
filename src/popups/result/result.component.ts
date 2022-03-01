/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-27 13:03:53
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:36:02
 */
import { Component } from '@angular/core';
import { Application } from 'resize-able-ui';
import { GenericModalComponent, TextData } from '../../service/dinomao-game.module';

@Component({
  template: ''
})
export class ResultComponent extends GenericModalComponent{

  priceText!: TextData;
  price: number = 0;
  timeCountdownText!: TextData;
  timeCountdownNumber: number = 0;

  protected startTime: number = 0;
  intervalId: any;

  protected confirmCallback: Function | null = null;

  constructor() {
    super();
  }

  protected getProcuctDataAndStartInterval( product: any ){
    this.startTime = product.time;
    this.price = product.price;
    this.confirmCallback = product.callback;

    this.intervalId = setInterval( this.countdown.bind(this), 990 );
    this.countdown();
  }

  retry(){
    this.closePo();
    if( this.confirmCallback ) this.confirmCallback();
  }

  countdown(){
    let t: number = Math.round( ( this.startTime - Application.getTimer() ) * 0.001 ) + 10;
    if( this.timeCountdownNumber == 0 && t < 0 ){
      clearInterval( this.intervalId );
      this.closePo();
    }
    else this.timeCountdownNumber = t;
  }

  ngOnDestroy(){
    clearInterval( this.intervalId );
    this.confirmCallback = null;
  }
}
