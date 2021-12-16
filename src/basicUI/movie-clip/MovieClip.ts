import { MCSuper } from './MCSuper';
import { Rectangle } from '../geom/rectangle';
import { Point } from '../geom/point';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:34:39
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 18:00:36
 */
import { MovieClipData } from "./MovieClipData";
import { SimpleRect } from '../geom/SimpleRect';

export class MovieClip extends MCSuper{

    private mcData: MovieClipData;

    private labels!: any[];
    private defaultFrames!: Array<any>;

    get textruePic(): string{
        return this.mcData?.texture;
    }

    anchorOffsetChange: Function | null = null;

    anchorOffset: Point = new Point;

    constructor( mcData: MovieClipData ){
        super();
        this.mcData = mcData;
        this.waitForAssets();
    }

    dispose(){
        super.dispose();
        this.anchorOffsetChange = null;
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

            this.startAfterAssetsGot();
        }
        else setTimeout( this.waitForAssets.bind( this ), 50 );
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

    setAnchorOffset( offsetX: number, offsetY: number ){
        this.anchorOffset = new Point().init( offsetX, offsetY );
        if( this.anchorOffsetChange ) this.anchorOffsetChange();
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
