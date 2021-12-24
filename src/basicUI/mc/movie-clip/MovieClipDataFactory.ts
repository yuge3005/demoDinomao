import { MovieClipData } from './MovieClipData';
import { SimpleRect } from '../../geom/SimpleRect';
import { HttpRequest } from '../../net/http-request';
import { LoadedUITextureDatas } from '../../settings/LoadedUITextureDatas';
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-24 15:49:34
 * @Description: Using the movieclipdatafactory class, you can generate movieclipdata objects for creating MovieClip
 * @ 使用 MovieClipDataFactory 类，可以生成 MovieClipData 对象用于创建MovieClip
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

    /**
     * @param {string} mcName
     * @return {*} 
     * @memberof MovieClipDataFactory
     * @Description: Generate a movieclipdata instance by name. Can be used to create MovieClip.
     * @ 根据名字生成一个MovieClipData实例。可以用于创建MovieClip。
     */
    getMovieClipData( mcName: string ){
        return new MovieClipData( this, mcName );
    }
}
