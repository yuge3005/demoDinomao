/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-10-25 11:43:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-07 17:00:49
*/
import { TextData } from '../../../../service/dinomao-game.module';
import { BitmapData, StyleX, Point } from 'resize-able-ui';
import { Component, SimpleChanges, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent implements OnInit{

  @Input() imgData!: BitmapData;
  @Input() buttonIcon!: BitmapData;

  @Output() itemClick: EventEmitter<Point> = new EventEmitter<Point>();
  @Input() soundUrl: string = "";

  playText!: TextData;
  playString: string = "PLAY";
  priceText!: TextData;

  @Input() coinIcon!: BitmapData;
  @Input() price: number = 0;

  innerContainer: Object = {};
  shadowBg: Object = {};
  lightTextShadow: Object = {};

  ngOnInit(){
    this.playText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":55,"y":105,"w":285,"x":20},"font":"rifficfree","stroke":0,"size":60,"align":"center"};
    this.priceText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":50,"y":172,"w":65,"x":156},"font":"FRAHV_0","stroke":0,"size":54,"align":"center"};

    this.innerContainer = StyleX.setItemRect( 0, 0, 286, 261 );
    this.shadowBg = StyleX.combine( StyleX.borderRadius(60), StyleX.setItemRect(90,168,140,60), StyleX.backgroundColor(0,0.5) );
    this.lightTextShadow = StyleX.textShadow( 2, 2, 4, 0x333333 );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.price ) {
      this.playString = this.price ? "PLAY" : "FREE";
    }
  }

  onButtonClick(): void{
    this.itemClick.emit();
  }
}
