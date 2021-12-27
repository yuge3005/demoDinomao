import { HtmlSound } from './HtmlSound';
import { HtmlSoundChannel } from './HtmlSoundChannel';
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-10-25 17:29:11
 * @description: Sound management via soundmanager Soundon controls the background music switch, soundmanager Soundefon controls the sound switch. SoundManager. Play plays music and sound effects. 
 * Musicpause and musicresume control the playback and pause of background music.You can also set the default button sound.
 * @ 声音管理，通过SoundManager.soundOn控制背景音乐开关，SoundManager.soundEfOn控制音效开关。SoundManager.play播放音乐和音效。musicPause和musicResume控制背景音乐的播放和暂停。还可以设置默认按钮音效。
 */
export class SoundManager {

	private static currentBackgorundMusicChannel: HtmlSoundChannel | null;
	private static currentBackgorundMusicSound: HtmlSound | null;

	private static pausing: boolean = false;
	private static pausePosition: number = -1;

	/**
	 * @static
	 * @type {string}
	 * @memberof SoundManager
	 * @description: Default button sound.
	 * @ 默认按钮音效。
	 */
	public static defaltButtonSound: string;

	/**
	 * @static
	 * @memberof SoundManager
	 * @description: Background music switch.
	 * @ 背景音乐开关。
	 */
	public static set backgroundMusicOn( value: boolean ){
		if( this.backgroundMusicOn == value )return;
		localStorage.setItem( "sound", value ? "" : "false" );
		if( value ){
			if( this.currentBackgorundMusicSound )this.startPlayGameMusic();
		}
		else{
			if( this.currentBackgorundMusicChannel ){
				this.currentBackgorundMusicChannel.stop();
			}
		}
	}
	public static get backgroundMusicOn(){
		if( localStorage.getItem( "sound" ) == "false" ) return false;
		return true;
	}

	/**
	 * @static
	 * @memberof SoundManager
	 * @description: Sound effect switch.
	 * @ 音效开关。
	 */
	public static set soundEfOn( value: boolean ){
		if( this.soundEfOn == value )return;
		localStorage.setItem( "soundEf", value ? "" : "false" );
	}
	public static get soundEfOn(){
		if( localStorage.getItem( "soundEf" ) == "false" ) return false;
		return true;
	}

	public constructor() {
	}

	/**
	 * @static
	 * @param {string} soundPath
	 * @param {boolean} [loop=false]
	 * @return {*} 
	 * @memberof SoundManager
	 * @description: Play sound effect or background music. If loop is true, it represents background music.
	 * @ 播放音效或背景音乐，loop是true，则代表背景音乐
	 */
	public static play( soundPath: string, loop: boolean = false ){
		if( loop && soundPath == this.currentBackgorundMusicSound?.url ) return;
		if( loop ) this.stopMusic();
		let sound: HtmlSound = new HtmlSound();
        sound.load( soundPath );
		sound.completeCallback = this.playSoundAfterLoad.bind(this, sound, loop);
    }
    
    private static playSoundAfterLoad( sound: HtmlSound, loop: boolean = false ){
        if( !sound )throw new Error( "can not fond sound resource" );
        
        if( loop ){
            this.stopMusic()
            this.currentBackgorundMusicSound = sound;
            if( this.backgroundMusicOn )this.startPlayGameMusic();
        }
        else{
            if( this.soundEfOn ){
                sound.play( 0, 1 );
            }
        }
	}
	
	/**
	 * @static
	 * @memberof SoundManager
	 * @description: Stop playing background music.
	 * @ 停止播放背景音乐。
	 */
	public static stopMusic(){
		if( this.currentBackgorundMusicChannel ){
			this.currentBackgorundMusicChannel.stop();
			this.currentBackgorundMusicChannel = null;
		}
	}

	private static startPlayGameMusic(){
		if( this.currentBackgorundMusicSound ){
			this.currentBackgorundMusicChannel = this.currentBackgorundMusicSound.play( 0, 0 );
			this.currentBackgorundMusicChannel.type = HtmlSound.MUSIC;
			this.currentBackgorundMusicChannel.volume = 1;
		}
	}

	/**
	 * @static
	 * @return {*} 
	 * @memberof SoundManager
	 * @description: Background music pause.
	 * @ 背景音乐暂停。
	 */
	public static musicPause(){
		if( !SoundManager.backgroundMusicOn ) return;
		if( SoundManager.currentBackgorundMusicChannel && !SoundManager.pausing ){
			SoundManager.pausePosition = SoundManager.currentBackgorundMusicChannel.position;
			SoundManager.pausing = true;
			SoundManager.currentBackgorundMusicChannel.stop();
		}
	}

	/**
	 * @static
	 * @return {*} 
	 * @memberof SoundManager
	 * @description: Background music resume.
	 * @ 背景音乐继续。
	 */
	public static musicResume(){
		if( !SoundManager.backgroundMusicOn ) return;
		if( SoundManager.currentBackgorundMusicSound && SoundManager.pausing ){
			SoundManager.currentBackgorundMusicChannel = SoundManager.currentBackgorundMusicSound.play( SoundManager.pausePosition, 0 );
			SoundManager.currentBackgorundMusicChannel.type = HtmlSound.MUSIC;
			SoundManager.currentBackgorundMusicChannel.volume = 1;
			SoundManager.pausePosition = 0;
			SoundManager.pausing = false;
		}
	}
}