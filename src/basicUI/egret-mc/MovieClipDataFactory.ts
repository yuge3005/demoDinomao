import { HttpRequest } from './../net/http-request';
import { LoadedUITextureDatas } from './../settings/LoadedUITextureDatas';
import { TextureData } from './../image/texture-data';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-13 17:41:50
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-14 09:45:13
 */
export class MovieClipDataFactory {

    textruePic: string = "";
    textureJson: string = "";
    textureData: any;

    constructor(textruePic: string = "", textureJson: string = "" ){
        this.setTexture( textruePic, textureJson );
    }

    setTexture( textruePic: string, textureJson: string ){
        this.textruePic = textruePic;
        this.textureJson = textureJson;

        if( LoadedUITextureDatas.loadTexture[this.textureJson] ){
            this.textureData = LoadedUITextureDatas.loadTexture[this.textureJson];
        }
        else{
            new HttpRequest().loadData( this.textureJson, this.getTexture.bind( this ), "GET", "" );
        }
    }

    getTexture( data: any ){
        LoadedUITextureDatas.loadTexture[this.textureJson] = this.textureData = data;
    }
}
