import { DisplayObject } from '../ui/displayObject';
import { Point } from "../geom/point";

/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-16 15:35:34
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-24 15:33:23
 */
export class MCSuper extends DisplayObject {

    setFrame: Function | null = null;
    setTransform: Function | null = null;

    protected frameRate: number = 0;
    protected intervalId: any = null;
    protected frames!: Array<any>;

    /**
     * @readonly
     * @type {number}
     * @memberof MCSuper
     * @description: The total number of frames in the MovieClip instance.
     * @ MovieClip 实例中帧的总数。
     */
    get totalFrames(): number{
        if( this.frames ) return this.frames.length;
        return 0;
    }

    currentFrame: number = 0;
    protected playTimes: number = 0;
    
    protected transformChange(): void{
        if( this.setTransform ) this.setTransform();
        else setTimeout( this.transformChange.bind( this ), 35 );
    }

    setPosition( x: number, y: number ){
        this.position = new Point().init( x, y );
        if( this.onPositionChange ) this.onPositionChange();
    }

    _playing: boolean = true;
    protected set playing( value: boolean ){
        if( !this._playing && value && this.frames && this.frames.length > 1 ){
            this.startInterval();
        }
        else if( this._playing && !value ) clearInterval( this.intervalId );
        this._playing = value;
    }
    protected get playing(): boolean{
        return this._playing;
    }

    /**
     * @readonly
     * @type {boolean}
     * @memberof MCSuper
     * @description: A Boolean value that indicates whether a movie clip is curently playing.
     * @ 一个布尔值，指示影片剪辑当前是否正在播放。
     */
    get isPlaying(): boolean{
        return this.playing;
    }

    /**
     * @param {number} [times=-1]
     * @memberof MCSuper
     * @description: Moves the playhead in the timeline of the movie clip.
     * @ 在影片剪辑的时间轴中移动播放头。
     */
    play( times: number = -1 ){
        this.playing = true;
        this.playTimes = times;
    }

    /**
     * @memberof MCSuper
     * @description: Stops the playhead in the movie clip.
     * @ 停止影片剪辑中的播放头。
     */
    stop(){
        this.playing = false;
    }

    dispose(){
        this.onPositionChange = null;
        this.setFrame = null;
        this.setTransform = null;
        clearInterval( this.intervalId );
    }

    protected startInterval(){
        this.intervalId = setInterval( this.enterFrame.bind( this ), Math.floor( 1000 / this.frameRate ) );
    }

    protected enterFrame(){
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

    protected startAfterAssetsGot(){
        if( !this.currentFrame ){
            if( this.setFrame ) this.setFrame( this.currentFrame = 1 );
            if( this.playing && this.frames.length > 1 ) this.startInterval();
        }
    }
    
    getFrameInfoByFrameIndex( frame: number ){
        if( this.frames ){
            return this.frames[frame];
        }
        return null;
    }

    private goto( frame: number, playing: boolean, callback: Function ){
        if( frame <= this.totalFrames && frame >= 1 ) this.currentFrame = frame;
        else console.error( "frame count error" );

        if( this.setFrame ) this.setFrame( frame );
        else setTimeout( callback, 35, frame );
        this.playing = playing;
    }

    protected gotoAndPlayByNumber( frame: number ){
        this.goto( frame, true, this.gotoAndPlayByNumber.bind( this ) );
    }

    protected gotoAndStopByNumber( frame: number ){
        this.goto( frame, false, this.gotoAndStopByNumber.bind( this ) );
    }
}
