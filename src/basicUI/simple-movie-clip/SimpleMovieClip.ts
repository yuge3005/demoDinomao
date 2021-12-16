import { MCSuper } from '../movie-clip/MCSuper';
import { Point } from "../geom/point";

/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 09:45:14
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 15:52:55
 */
export class SimpleMovieClip extends MCSuper{

    textruePic: string = "";
    textureJson: string = ""

    playing: boolean = true;

    constructor( textruePic: string = "", textureJson: string = "" ){
        super();
        this.setTexture( textruePic, textureJson );
    }
    
    setTexture( textruePic: string, textureJson: string ){
        this.textruePic = textruePic;
        this.textureJson = textureJson;
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
