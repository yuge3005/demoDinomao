import { MCSuper } from './MCSuper';
import { Rectangle } from '../geom/rectangle';
import { Point } from '../geom/point';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:34:39
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 15:43:48
 */
import { MovieClipData } from "./MovieClipData";
import { SimpleRect } from '../geom/SimpleRect';

export class MovieClip extends MCSuper{

    private mcData: MovieClipData;
    private frames!: Array<any>;
    private frameRate: number = 0;
    private labels!: any[];
    private defaultFrames!: Array<any>;

    get textruePic(): string{
        return this.mcData?.texture;
    }

    anchorOffsetChange: Function | null = null;

    private intervalId: any = null;

    _playing: boolean = true;
    set playing( value: boolean ){
        if( !this._playing && value && this.frames && this.frames.length > 1 ){
            this.startInterval();
        }
        else if( this._playing && !value ) clearInterval( this.intervalId );
        this._playing = value;
    }
    get playing(): boolean{
        return this._playing;
    }

    position: Point = new Point;
    anchorOffset: Point = new Point;

    get x(): number{
        return this.position.x;
    }
    set x( value: number ){
        if( value != this.position.x ){
            this.position.x = value;
            if( this.positionChange ) this.positionChange();
        }
    }

    get y(): number{
        return this.position.y;
    }
    set y( value: number ){
        if( value != this.position.y ){
            this.position.y = value;
            if( this.positionChange ) this.positionChange();
        }
    }

    currentFrame: number = 0;
    private playTimes: number = 0;

    get totalFrames(): number{
        if( this.frames ) return this.frames.length;
        return 0;
    }

    constructor( mcData: MovieClipData ){
        super();
        this.mcData = mcData;
        this.waitForAssets();
    }

    dispose(){
        this.positionChange = null;
        this.setFrame = null;
        this.setTransform = null;
        this.anchorOffsetChange = null;
        clearInterval( this.intervalId );
    }

    private waitForAssets(){
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
                if( this.playing && this.frames.length > 1 ) this.startInterval();
            }
        }
        else setTimeout( this.waitForAssets.bind( this ), 50 );
    }

    private startInterval(){
        this.intervalId = setInterval( this.enterFrame.bind( this ), Math.floor( 1000 / this.frameRate ) );
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

        if( typeof frameOrLabel=='string' ){
            let labelData: any[] | null = this.getLabelFrames(frameOrLabel);
            if( labelData ){
                this.frames = labelData;
                this.gotoAndPlayByNumber( 1 );
            }
            else console.error( "frame label error" );
        }
        else this.gotoAndPlayByNumber( frameOrLabel );
    }

    gotoAndStop( frameOrLabel: any ){
        if( !this.frames ){
            setTimeout( this.gotoAndStop.bind( this ), 35, frameOrLabel );
            return;
        }

        if( typeof frameOrLabel=='string' ){
            let labelData: any[] | null = this.getLabelFrames(frameOrLabel);
            if( labelData ){
                this.frames = labelData;
                this.gotoAndStopByNumber( 1 );
            }
            else console.error( "frame label error" );
        }
        else this.gotoAndStopByNumber( frameOrLabel );
    }

    private goto( frame: number, playing: boolean, callback: Function ){
        if( frame <= this.totalFrames && frame >= 1 ) this.currentFrame = frame;
        else console.error( "frame count error" );

        if( this.setFrame ) this.setFrame( frame );
        else setTimeout( callback, 35, frame );
        this.playing = playing;
    }

    private gotoAndPlayByNumber( frame: number ){
        this.goto( frame, true, this.gotoAndPlayByNumber.bind( this ) );
    }

    private gotoAndStopByNumber( frame: number ){
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

    private enterFrame(){
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

    private getLabelFrames( label: string ): any[] | null{
        let labelObj: any;
        if( this.labels && this.labels.length ){
            for( let i: number = 0; i < this.labels.length; i++ ){
                if( this.labels[i].name == label ){
                    labelObj = this.labels[i];
                    break;
                }
            }
        }
        else return null;

        if( !labelObj ) return null;

        let allFrames: any[] = [];
        let curruntFrame: number = 0;
        let frames: any[] = [];
        for( let i: number = 0; i < this.defaultFrames.length; i++ ){
            if( allFrames.indexOf( this.defaultFrames[i] ) < 0 ){
                curruntFrame++;
                allFrames.push( this.defaultFrames[i] )
            }
            if( curruntFrame >= labelObj.frame ){
                frames.push( this.defaultFrames[i] );
                if( curruntFrame == labelObj.end ) break;
            }
        }
        return frames;
    }
}
