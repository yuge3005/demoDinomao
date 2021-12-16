import { SimpleMovieClipTexture } from './SimpleMovieClipTexture';
import { HttpRequest } from './../net/http-request';
import { LoadedUITextureDatas } from './../settings/LoadedUITextureDatas';
import { MCSuper } from '../movie-clip/MCSuper';
import { Point } from '../geom/point';

/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 09:45:14
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 17:54:47
 */
export class SimpleMovieClip extends MCSuper{

    textruePic: string = "";
    textureJson: string = "";
    textureData: any;

    sizeChange: Function | null = null;

    size: Point = new Point;

    private playTimes: number = 0;

    get totalFrames(): number{
        // if( this.frames ) return this.frames.length;
        return 0;
    }

    constructor( textruePic: string = "", textureJson: string = "" ){
        super();
        this.setTexture( textruePic, textureJson );
    }
    
    setTexture( textruePic: string, textureJson: string ){
        this.textruePic = textruePic;
        this.textureJson = textureJson;

        if( LoadedUITextureDatas.loadTexture[this.textureJson] ){
            this.textureData = LoadedUITextureDatas.loadTexture[this.textureJson];
            this.afterGetTexture();
        }
        else{
            new HttpRequest().loadData( this.textureJson, this.getTexture.bind( this ), "GET", "" );
        }
    }

    private getTexture( data: any ){
        LoadedUITextureDatas.loadTexture[this.textureJson] = this.textureData = data;
        this.afterGetTexture();
    }

    private afterGetTexture(){
        let textureData: SimpleMovieClipTexture = this.textureData;

        this.frameRate = Math.floor( 1000 * textureData.duration / 60 );
        this.frames = textureData.frames;
        this.size = new Point().init( textureData.width, textureData.height );
        if( this.sizeChange ) this.sizeChange( this.size );

        this.startAfterAssetsGot();
    }

    dispose(){
        super.dispose();
    }

    play(){
        this.playing = true;
    }

    stop(){
        this.playing = false;
    }

    gotoAndPlay( frame: number ){
        if( this.setFrame ) this.setFrame( frame );
        else setTimeout( this.gotoAndPlay.bind( this ), 35, frame );
        this.playing = true;
    }

    gotoAndStop( frame: number ){
        if( this.setFrame ) this.setFrame( frame );
        else setTimeout( this.gotoAndStop.bind( this ), 35, frame );
        this.playing = false;
    }
}
