import { SimpleMovieClipTexture } from './SimpleMovieClipTexture';
import { HttpRequest } from '../../net/http-request';
import { LoadedUITextureDatas } from '../../settings/LoadedUITextureDatas';
import { MCSuper } from '../MCSuper';
import { Point } from '../../geom/point';

/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-16 17:54:47
 * @class SimpleMovieClip
 * @extends {MCSuper}
 * @description: The simplified version of MovieClip that used to play animation, and the material can be generated with special tools
 * @ 简化版的MovieClip，用于播放动画,素材可用专用工具生成
 * @ provid public method: gotoAndPlay, gotoAndStop, and extends public method: play, stop, setPosition
 * @ public property: x, y, isPlaying, rotation, scaleX, scaleY, totalFrames
 */
export class SimpleMovieClip extends MCSuper{

    textruePic: string = "";
    textureJson: string = "";
    textureData: any;

    sizeChange: Function | null = null;

    size: Point = new Point;

    constructor( textruePic: string = "", textureJson: string = "" ){
        super();
        this.setTexture( textruePic, textureJson );
    }
    
    /**
     * @protected
     * @param {string} textruePic
     * @param {string} textureJson
     * @memberof SimpleMovieClip
     * @description: set the assets of the animation
     * @ 设置动画素材
     */
    protected setTexture( textruePic: string, textureJson: string ){
        this.textruePic = textruePic;
        this.textureJson = textureJson;

        if( LoadedUITextureDatas.loadTexture[this.textureJson] ){
            this.textureData = LoadedUITextureDatas.loadTexture[this.textureJson];
            this.afterGetTexture();
        }
        else{
            new HttpRequest().loadData( this.textureJson, this.getTexture.bind( this ), "GET", "" );
        }
    }

    private getTexture( data: any ){
        LoadedUITextureDatas.loadTexture[this.textureJson] = this.textureData = data;
        this.afterGetTexture();
    }

    protected afterGetTexture(){
        let textureData: SimpleMovieClipTexture = this.textureData;

        this.frameRate = 60 / textureData.duration;
        this.frames = textureData.frames;
        this.size = new Point( textureData.width, textureData.height );
        if( this.sizeChange ) this.sizeChange();

        this.startAfterAssetsGot();
    }

    dispose(){
        super.dispose();
        this.sizeChange = null;
    }

    /**
     * @param {number} frame
     * @param {number} [times=-1]
     * @return {*} 
     * @memberof SimpleMovieClip
     * @description: Starts playing the SWF file at the specified frame.
     * @ 从指定帧开始播放动画。
     */
    gotoAndPlay( frame: number, times: number = -1 ){
        if( !this.frames ){
            setTimeout( this.gotoAndStop.bind( this ), 35, frame );
            return;
        }
        this.playTimes = times;

        this.gotoAndPlayByNumber( frame );
    }

    /**
     * @param {number} frame
     * @return {*} 
     * @memberof SimpleMovieClip
     * @description: Brings the playhead to the specified frame of the movie clip and stops it there.
     * @ 将播放头移到影片剪辑的指定帧并停在那里。
     */
    gotoAndStop( frame: number ){
        if( !this.frames ){
            setTimeout( this.gotoAndStop.bind( this ), 35, frame );
            return;
        }
        
        this.gotoAndStopByNumber( frame );
    }
}
