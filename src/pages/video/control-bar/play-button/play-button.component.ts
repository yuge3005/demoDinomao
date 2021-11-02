/*
* @Description: 
* @version: 1.0
* @Author: Wayne Yu
* @Date: 2021-10-25 11:43:00
* @LastEditors: Wayne Yu
* @LastEditTime: 2021-11-02 10:10:43
*/
import { TextData } from '../../../../service/dinomao-game.module';
import { ImageScaleButtonComponent, BitmapData } from '../../../../basicUI/basic-ui.module';
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
    this.playText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":55,"y":105,"w":285,"x":20},"font":"rifficfree","stroke":0,"size":60,"align":"center"};
    this.priceText = {"color":0xffffff,"strokeColor":0x0000ff,"rect":{"h":50,"y":172,"w":65,"x":156},"font":"FRAHV_0","stroke":0,"size":54,"align":"center"};
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes.imgData || changes.buttonIcon ) super.ngOnChanges( changes );

    if( changes.price ) {
      this.playString = this.price ? "PLAY" : "FREE";
    }
  }
}
