import { HtmlSound } from './HtmlSound';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-20 14:29:21
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-30 09:29:52
 */
export class HtmlSoundChannel {

    get position(): number {
        if (!this.audio)
            return 0;
        return this.audio.currentTime;
    }

    public startTime: number = 0;
    private audio: any = null;
    private isStopped: boolean = false;
    public loops: number = 0;

    private _volume: number = 0;

    set volume( value: number ) {
        if (this.isStopped) {
            console.error( "Sound has stopped" );
            return;
        }
        this._volume = value;
        if (this.audio) this.audio.volume = value;
    }
    get volume(): number {
        return this._volume;
    }

    public url!: string;

    public static usingChannel: HtmlSoundChannel[] = [];

    public soundCompleteCallback!: Function;

    constructor(audio: any){
        this._volume = 1;
        audio.addEventListener("ended", this.onPlayEnd.bind(this));
        this.audio = audio;
    }
    
    private canPlay() {
        this.audio.removeEventListener("canplay", this.canPlay.bind(this));
        try {
            this.audio.currentTime = this.startTime;
        }
        catch (e) {
        }
        finally {
            this.audio.play();
        }
    };

    private onPlayEnd() {
        if (this.loops == 1) {
            this.stop();
            if( this.soundCompleteCallback ) this.soundCompleteCallback();
            return;
        }
        if (this.loops > 0) {
            this.loops--;
        }
        this.play();
    };

    public play() {
        if (this.isStopped) {
            console.error( "Sound has stopped" );
            return;
        }
        try {
            this.audio.volume = this._volume;
            this.audio.currentTime = this.startTime;
        }
        catch (e) {
            this.audio.addEventListener("canplay", this.canPlay.bind(this));
            return;
        }
        this.audio.play();
    };
    
    public stop() {
        if (!this.audio)
            return;
        if (!this.isStopped) {
            HtmlSoundChannel.popSoundChannel(this);
        }
        this.isStopped = true;
        var audio = this.audio;
        audio.removeEventListener("ended", this.onPlayEnd.bind(this));
        audio.removeEventListener("canplay", this.canPlay.bind(this));
        audio.volume = 0;
        this._volume = 0;
        this.audio = null;
        var url = this.url;
        //延迟一定时间再停止，规避chrome报错
        window.setTimeout(function () {
            audio.pause();
            HtmlSound.recycle(url, audio);
        }, 200);
    };

    public static pushSoundChannel(channel: HtmlSoundChannel) {
        if (this.usingChannel.indexOf(channel) < 0) {
            this.usingChannel.push(channel);
        }
    }

    public static popSoundChannel(channel: HtmlSoundChannel) {
        var index = this.usingChannel.indexOf(channel);
        if (index >= 0) {
            this.usingChannel.splice(index, 1);
            return true;
        }
        return false;
    }
}