import { Rectangle } from './../geom/rectangle';
import { Point } from '../geom/point';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:34:39
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-14 17:32:30
 */
import { MovieClipData } from "./MovieClipData";
import { SimpleRect } from '../geom/SimpleRect';

export class EgretMc {

    mcData: MovieClipData;
    frames!: Array<Array<number>>;
    frameRate: number = 0;
    labels!: any[];

    get textruePic(): string{
        return this.mcData?.texture;
    }

    positionChange: Function | null = null;
    setFrame: Function | null = null;
    setTransform: Function | null = null;

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
            this.frames = [];
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

    play(){
        this.playing = true;
    }

    stop(){
        this.playing = false;
    }

    gotoAndPlay( frame: number ){
        if( this.frames ){
            if( frame <= this.totalFrames && frame >= 1 ) this.currentFrame = frame;
            else console.error( "frame count error" );
        }
        else return;
        if( this.setFrame ) this.setFrame( frame );
        else setTimeout( this.gotoAndPlay.bind( this ), 35, frame );
        this.playing = true;
    }

    gotoAndStop( frame: number ){
        if( this.frames ){
            if( frame <= this.totalFrames && frame >= 1 ) this.currentFrame = frame;
            else console.error( "frame count error" );
        }
        else return;
        if( this.setFrame ) this.setFrame( frame );
        else setTimeout( this.gotoAndStop.bind( this ), 35, frame );
        this.playing = false;
    }

    setPosition( x: number, y: number ){
        this.position = new Point().init( x, y );
        if( this.positionChange ) this.positionChange();
    }

    transformChange(){
        if( this.setTransform ) this.setTransform();
        else setTimeout( this.transformChange.bind( this ), 35 );
    }

    enterFrame(){
        this.currentFrame += 1;
        if( this.currentFrame >= this.frames.length ) this.currentFrame -= this.frames.length;
        if( this.setFrame ) this.setFrame( this.currentFrame );
    }

    getFrameInfoByFrameIndex( frame: number ){
        if( this.frames ){
            return this.frames[frame];
        }
        return null;
    }
}
