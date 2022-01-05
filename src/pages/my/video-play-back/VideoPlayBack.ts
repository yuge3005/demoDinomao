import { Component } from '@angular/core';
import { BitmapData, Application, StyleX } from '../../../basicUI/basic-ui.module';
import { MainPage, Loading } from '../../../service/dinomao-game.module';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-16 10:25:15
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:26:20
 */
@Component({
    template: ''
})
export class VideoPlayBack extends MainPage{

    backBtn!: BitmapData;
    recordData: any;
    productImg: string = "";

    topPannel!: BitmapData;
    bottomPannel!: BitmapData;
    productFrame!: BitmapData;
    processBar!: BitmapData;
    processPoint!: BitmapData;

    private isIOS: boolean = Application.system.isApp() && Application.system.isIOS;
    public get iframeHeight(): number{
      return this.pageHeight -550 + ( this.isIOS ? 25 : 0 );
    }
    
    constructor() {
        super();
        this.textureUrl = "assets/video_ui/playback/playback.json";
    }

    initUI() {
        Loading.status = 2;

        this.topPannel = this.textureData.getTexture( "bg_up" );
        this.bottomPannel = this.textureData.getTexture( "bg_bottom" );
        this.productFrame = this.textureData.getTexture( "box_frame", 30, 40 );
        this.processBar = this.textureData.getTexture( "box_frame", 30, 135 );
        this.processPoint = this.textureData.getTexture( "btn_slide" );
    
        this.backBtn = this.textureData.getTexture( "btn_return", 30, 135 );

        this.styles.noneSelect = StyleX.noneSelect();
        this.styles.productImg = StyleX.combine( StyleX.borderRadius(30), StyleX.setItemRect(70,105,245,245) );
        this.styles.stretchingBg = StyleX.stretchingBg( "assets/loading_ui/loading_bg.jpg" );
    }
}
