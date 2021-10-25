import { BitmapData } from './../../../../basicUI/image/bitmap-data';
import { TextData } from '../../../../service/gameData/TextData';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-25 11:43:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-25 14:53:47
 */
import { ImageScaleButtonComponent } from '../../../../basicUI/basic-ui.module';
import { Component, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css']
})
export class PlayButtonComponent extends ImageScaleButtonComponent {

  playText!: TextData;
  playString: string = "PLAY";
  priceText!: TextData;

  @Input() coinIcon!: BitmapData;
  @Input() price: number = 0;

  constructor() {
    super();
  }

  ngOnInit(){
    this.playText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":55,"y":100,"w":285,"x":20},"font":"rifficfree","stroke":0,"size":60,"align":"center"};
    this.priceText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":50,"y":167,"w":85,"x":156},"font":"FRAHV_0","stroke":0,"size":54,"align":"left"};
  }
}
