/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-20 14:29:21
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-20 15:10:57
 */
export class HtmlSoundChannel {

    get position(): number {
        if (!this.audio)
            return 0;
        return this.audio.currentTime;
    }

    private startTime: number = 0;
    private audio: any = null;
    private isStopped: boolean = false;

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

    constructor(audio: any){
        this._volume = 1;
        audio.addEventListener("ended", this.onPlayEnd);
        this.audio = audio;
    }
    
    private canPlay() {
        this.audio.removeEventListener("canplay", this.canPlay);
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
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE);
            return;
        }
        if (this.loops > 0) {
            this.loops--;
        }
        this.play();
    };

    private play() {
        if (this.isStopped) {
            console.error( "Sound has stopped" );
            return;
        }
        try {
            this.audio.volume = this._volume;
            this.audio.currentTime = this.startTime;
        }
        catch (e) {
            this.audio.addEventListener("canplay", this.canPlay);
            return;
        }
        this.audio.play();
    };
}

/**
 * @private
 * @inheritDoc
 */
HtmlSoundChannel.prototype.stop = function () {
if (!this.audio)
    return;
if (!this.isStopped) {
    egret.sys.$popSoundChannel(this);
}
this.isStopped = true;
var audio = this.audio;
audio.removeEventListener("ended", this.onPlayEnd);
audio.removeEventListener("canplay", this.canPlay);
audio.volume = 0;
this._volume = 0;
this.audio = null;
var url = this.$url;
//延迟一定时间再停止，规避chrome报错
window.setTimeout(function () {
    audio.pause();
    web.HtmlSound.$recycle(url, audio);
}, 200);
};