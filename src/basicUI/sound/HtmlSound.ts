import { HtmlSoundChannel } from './HtmlSoundChannel';
export class HtmlSound {

    private static audios: any = {};
    private static clearAudios: any = {};
    
    public static MUSIC = "music";
    public static EFFECT = "effect";
    public static loadingSoundMap: any = {};

    public completeCallback!: Function;
    public loadErrorCallback!: Function;
    
    originAudio: any;
    loaded: boolean;
    url!: string;

    type: string = HtmlSound.EFFECT;

    public get length(): number{
        if (this.originAudio) {
            return this.originAudio.duration;
        }
        throw new Error("sound not loaded!");
    }

    public constructor() {
		this.loaded = false;
    }
    
    public static recycle(url: string, audio: any ): void {
        if (HtmlSound.clearAudios[url]) {
            return;
        }
        var array = HtmlSound.audios[url];
        if (HtmlSound.audios[url] == null) {
            array = HtmlSound.audios[url] = [];
        }
        array.push(audio);
    };

    private static pop(url: string): any {
        var array = HtmlSound.audios[url];
        if (array && array.length > 0) {
            return array.pop();
        }
        return null;
    };

    private static clear(url: string): void {
        HtmlSound.clearAudios[url] = true;
        var array = HtmlSound.audios[url];
        if (array) array.length = 0;
    };

    public close() {
        if (this.loaded && this.originAudio) {
            this.originAudio.src = "";
        }
        if (this.originAudio) this.originAudio = null;
        HtmlSound.clear(this.url);
        this.loaded = false;
    };

    public play(startTime: number = 0, loops: number = 0) {
        if ( this.loaded == false) {
            throw new Error("sound not loaded!");
        }
        var audio = HtmlSound.pop(this.url);
        if (audio == null) {
            audio = this.originAudio.cloneNode();
        }
        else {
            //audio.load();
        }
        audio.autoplay = true;
        var channel = new HtmlSoundChannel(audio);
        channel.url = this.url;
        channel.loops = loops;
        channel.startTime = startTime;
        channel.play();
        HtmlSoundChannel.pushSoundChannel(channel);
        return channel;
    };

    public load(url: string) {
        var self = this;
        this.url = url;
        if (!url) {
            throw new Error("sound url wrong!");
        }
        var audio = new Audio(url);
        audio.addEventListener("canplaythrough", onAudioLoaded);
        audio.addEventListener("error", onAudioError);
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("firefox") >= 0) {
            audio.autoplay = !0;
            audio.muted = true;
        }
        //edge and ie11
        var ie = ua.indexOf("edge") >= 0 || ua.indexOf("trident") >= 0;
        if (ie) {
            document.body.appendChild(audio);
        }
        audio.load();
        HtmlSound.loadingSoundMap[url] = audio;
        this.originAudio = audio;
        if (HtmlSound.clearAudios[this.url]) {
            delete HtmlSound.clearAudios[this.url];
        }
        function onAudioLoaded() {
            delete HtmlSound.loadingSoundMap[url];
            HtmlSound.recycle(self.url, audio);
            removeListeners();
            if (ua.indexOf("firefox") >= 0) {
                audio.pause();
                audio.muted = false;
            }
            if (ie) {
                document.body.appendChild(audio);
            }
            self.loaded = true;
            if( self.completeCallback ) self.completeCallback();
        }
        function onAudioError() {
            removeListeners();
            if( self.loadErrorCallback ) self.loadErrorCallback();
        }
        function removeListeners() {
            audio.removeEventListener("canplaythrough", onAudioLoaded);
            audio.removeEventListener("error", onAudioError);
            if (ie) {
                document.body.removeChild(audio);
            }
        }
    }
};