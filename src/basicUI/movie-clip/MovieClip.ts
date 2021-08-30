import { Point } from "../geom/point";

/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-30 09:45:14
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-30 13:58:51
 */
export class MovieClip {

    textruePic: string = "";
    textureJson: string = ""

    positionChange: Function | null = null;
    setFrame: Function | null = null;

    playing: boolean = true;

    position: Point = new Point;

    constructor( textruePic: string = "", textureJson: string = "" ){
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

    setPosition( x: number, y: number ){
        this.position = new Point().init( x, y );
        if( this.positionChange ) this.positionChange();
    }
}
