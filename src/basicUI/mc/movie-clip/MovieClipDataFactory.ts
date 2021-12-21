import { MovieClipData } from './MovieClipData';
import { SimpleRect } from '../../geom/SimpleRect';
import { HttpRequest } from '../../net/http-request';
import { LoadedUITextureDatas } from '../../settings/LoadedUITextureDatas';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:41:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-21 15:22:49
 */
export class MovieClipDataFactory {

    textruePic: string = "";
    textureJson: string = "";
    textureData: any;

    res!: {[key: string]: SimpleRect};
    mc!: {[key: string]: any};

    constructor(textruePic: string = "", textureJson: string = "" ){
        this.setTexture( textruePic, textureJson );
    }

    private setTexture( textruePic: string, textureJson: string ){
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
        this.res = this.textureData.res;
        this.mc = this.textureData.mc;
    }

    getMovieClipData( mcName: string ){
        return new MovieClipData( this, mcName );
    }
}
