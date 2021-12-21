import { SimpleMovieClipTexture } from './SimpleMovieClipTexture';
import { HttpRequest } from '../../net/http-request';
import { LoadedUITextureDatas } from '../../settings/LoadedUITextureDatas';
import { MCSuper } from '../MCSuper';
import { Point } from '../../geom/point';

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

    protected afterGetTexture(){
        let textureData: SimpleMovieClipTexture = this.textureData;

        this.frameRate = 60 / textureData.duration;
        this.frames = textureData.frames;
        this.size = new Point().init( textureData.width, textureData.height );
        if( this.sizeChange ) this.sizeChange();

        this.startAfterAssetsGot();
    }

    dispose(){
        super.dispose();
        this.sizeChange = null;
    }

    gotoAndPlay( frame: number, times: number = -1 ){
        if( !this.frames ){
            setTimeout( this.gotoAndStop.bind( this ), 35, frame );
            return;
        }
        this.playTimes = times;

        this.gotoAndPlayByNumber( frame );
    }

    gotoAndStop( frame: number ){
        if( !this.frames ){
            setTimeout( this.gotoAndStop.bind( this ), 35, frame );
            return;
        }
        
        this.gotoAndStopByNumber( frame );
    }
}
