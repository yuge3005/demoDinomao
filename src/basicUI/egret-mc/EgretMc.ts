import { Rectangle } from './../geom/rectangle';
import { Point } from '../geom/point';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:34:39
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-15 16:50:37
 */
import { MovieClipData } from "./MovieClipData";
import { SimpleRect } from '../geom/SimpleRect';

export class EgretMc {

    mcData: MovieClipData;
    frames!: Array<Array<number>>;
    frameRate: number = 0;
    labels!: any[];
    defaultFrames!: Array<Array<number>>;

    get textruePic(): string{
        return this.mcData?.texture;
    }

    positionChange: Function | null = null;
    setFrame: Function | null = null;
    setTransform: Function | null = null;
    anchorOffsetChange: Function | null = null;

    intervalId: any = null;

    _playing: boolean = true;
    set playing( value: boolean ){
        if( !this._playing && value && this.frames ){
            this.intervalId = setInterval( this.enterFrame.bind( this ), Math.floor( 1000 / this.frameRate ) );
        }
        else if( this._playing && !value ) clearInterval( this.intervalId );
        this._playing = value;
    }
    get playing(): boolean{
        return this._playing;
    }

    position: Point = new Point;
    anchorOffset: Point = new Point;

    _scaleX: number = 1;
    set scaleX( value: number ){
        if( isNaN( value ) ) return;
        this._scaleX = value;
        this.transformChange();
    }
    get scaleX(): number{
        return this._scaleX;
    }

    _scaleY: number = 1;
    set scaleY( value: number ){
        if( isNaN( value ) ) return;
        this._scaleY = value;
        this.transformChange();
    }
    get scaleY(){
        return this._scaleY;
    }

    _rotation: number = 0;
    set rotation( value: number ){
        if( isNaN( value ) ) return;
        this._rotation = value;
        this.transformChange();
    }
    get rotation(){
        return this._rotation;
    }

    currentFrame: number = 0;
    playTimes: number = 0;

    get totalFrames(): number{
        if( this.frames ) return this.frames.length;
        return 0;
    }

    constructor( mcData: MovieClipData ){
        this.mcData = mcData;
        this.waitForAssets();
    }

    waitForAssets(){
        if( this.mcData.mc ){
            this.frameRate = this.mcData.mc.frameRate;
            this.labels = this.mcData.mc.labels;
            this.defaultFrames = this.frames = [];
            let res: any = this.mcData.res;
            for( let i: number = 0; i < this.mcData.mc.frames.length; i++ ){
                let frameInfo: any = this.mcData.mc.frames[i];
                frameInfo.position = new Point().init( frameInfo.x, frameInfo.y );
                let rect: SimpleRect = res[frameInfo.res];
                frameInfo.rect = new Rectangle().init(rect.x,rect.y,rect.w,rect.h);
                let count: number = frameInfo.duration;
                if( !count ) count = 1;
                while( count-- > 0 ){
                    this.frames.push( frameInfo );
                }
            }
            if( !this.currentFrame ){
                if( this.setFrame ) this.setFrame( this.currentFrame = 1 );
                if( this.playing ) this.intervalId = setInterval( this.enterFrame.bind( this ), Math.floor( 1000 / this.frameRate ) );
            }
        }
        else setTimeout( this.waitForAssets.bind( this ), 50 );
    }

    play( times: number = -1 ){
        this.playing = true;
        this.playTimes = times;
    }

    stop(){
        this.playing = false;
    }

    gotoAndPlay( frameOrLabel: any, times: number = -1 ){
        if( !this.frames ){
            setTimeout( this.gotoAndPlay.bind( this ), 35, frameOrLabel, times );
            return;
        }
        this.playTimes = times;

        console.log( typeof frameOrLabel=='string' )
    }

    gotoAndStop( frameOrLabel: any ){
        if( !this.frames ){
            setTimeout( this.gotoAndStop.bind( this ), 35, frameOrLabel );
            return;
        }

        console.log( typeof frameOrLabel=='string' )
    }

    goto( frame: number, playing: boolean, callback: Function ){
        if( frame <= this.totalFrames && frame >= 1 ) this.currentFrame = frame;
        else console.error( "frame count error" );

        if( this.setFrame ) this.setFrame( frame );
        else setTimeout( this.gotoAndPlayByNumber.bind( this ), 35, frame );
        this.playing = playing;
    }

    gotoAndPlayByNumber( frame: number ){
        this.goto( frame, true, this.gotoAndPlayByNumber.bind( this ) );
    }

    gotoAndStopByNumber( frame: number ){
        this.goto( frame, false, this.gotoAndStopByNumber.bind( this ) );
    }

    setPosition( x: number, y: number ){
        this.position = new Point().init( x, y );
        if( this.positionChange ) this.positionChange();
    }

    setAnchorOffset( offsetX: number, offsetY: number ){
        this.anchorOffset = new Point().init( offsetX, offsetY );
        if( this.anchorOffsetChange ) this.anchorOffsetChange();
    }

    transformChange(){
        if( this.setTransform ) this.setTransform();
        else setTimeout( this.transformChange.bind( this ), 35 );
    }

    enterFrame(){
        this.currentFrame += 1;
        if( this.currentFrame > this.frames.length ){
            this.playTimes--;
            if( !this.playTimes ){
                this.stop();
                return;
            }
            else{
                this.currentFrame -= this.frames.length;
            }
        }
        if( this.setFrame ) this.setFrame( this.currentFrame );
    }

    getFrameInfoByFrameIndex( frame: number ){
        if( this.frames ){
            return this.frames[frame];
        }
        return null;
    }
}
