import { HtmlSound } from './HtmlSound';
import { HtmlSoundChannel } from './HtmlSoundChannel';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-24 10:54:36
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-24 11:52:51
 */
export class SoundManager {

	private static currentBackgorundMusicChannel: HtmlSoundChannel | null;
	private static currentBackgorundMusicSound: HtmlSound;

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
        let sound: HtmlSound = new HtmlSound();
        sound.load( soundPath );
        sound.completeCallback = this.playSoundAfterLoad.bind(this, sound, loop);
    }
    
    private static playSoundAfterLoad( sound: HtmlSound, loop: boolean = false ){
        if( !sound )throw new Error( "can not fond sound resource" );
        
        if( loop ){
            if( this.currentBackgorundMusicChannel )this.currentBackgorundMusicChannel.stop();
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

	private static startPlayGameMusic(){
		this.currentBackgorundMusicSound.type = HtmlSound.MUSIC;
		this.currentBackgorundMusicChannel = this.currentBackgorundMusicSound.play( 0, 0 );
		this.currentBackgorundMusicChannel.volume = 1;
	}
}