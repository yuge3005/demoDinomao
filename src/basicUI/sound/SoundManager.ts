import { HtmlSound } from './HtmlSound';
import { HtmlSoundChannel } from './HtmlSoundChannel';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-24 10:54:36
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-24 15:13:15
 */
export class SoundManager {

	private static currentBackgorundMusicChannel: HtmlSoundChannel | null;
	private static currentBackgorundMusicSound: HtmlSound | null;

	private static pausing: boolean = false;
	private static pausePosition: number = -1;

	public static set soundOn( value: boolean ){
		if( this.soundOn == value )return;
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
	public static get soundOn(){
		if( localStorage.getItem( "sound" ) == "false" ) return false;
		return true;
	}

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

	public static play( soundPath: string, loop: boolean = false ){
		if( this.currentBackgorundMusicSound ) console.log( this.currentBackgorundMusicSound.url )
		if( loop && this.currentBackgorundMusicSound && soundPath == this.currentBackgorundMusicSound.url ) return;
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
            if( this.soundOn )this.startPlayGameMusic();
        }
        else{
            if( this.soundEfOn ){
                sound.type = HtmlSound.EFFECT;
                sound.play( 0, 1 );
            }
        }
	}
	
	public static stopMusic(){
		if( this.currentBackgorundMusicChannel ){
			this.currentBackgorundMusicChannel.stop();
			this.currentBackgorundMusicChannel = null;
		}
	}

	private static startPlayGameMusic(){
		if( this.currentBackgorundMusicSound ){
			this.currentBackgorundMusicSound.type = HtmlSound.MUSIC;
			this.currentBackgorundMusicChannel = this.currentBackgorundMusicSound.play( 0, 0 );
			this.currentBackgorundMusicChannel.volume = 1;
		}
	}

	public static musicPause(){
		if( !SoundManager.soundOn ) return;
		if( SoundManager.currentBackgorundMusicChannel && !SoundManager.pausing ){
			SoundManager.pausePosition = SoundManager.currentBackgorundMusicChannel.position;
			SoundManager.pausing = true;
			SoundManager.currentBackgorundMusicChannel.stop();
		}
	}

	public static musicResume(){
		if( !SoundManager.soundOn ) return;
		if( SoundManager.currentBackgorundMusicSound && SoundManager.pausing ){
			SoundManager.currentBackgorundMusicChannel = SoundManager.currentBackgorundMusicSound.play( 0, 0 );
			SoundManager.currentBackgorundMusicChannel.volume = 1;
			SoundManager.pausePosition = 0;
			SoundManager.pausing = false;
		}
	}
}