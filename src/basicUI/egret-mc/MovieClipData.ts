import { SimpleRect } from '../geom/SimpleRect';
import { MovieClipDataFactory } from './MovieClipDataFactory';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-14 11:14:25
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-14 16:32:39
 */
export class MovieClipData {

    mcf: MovieClipDataFactory;
    mcName: string;

    constructor( mcf: MovieClipDataFactory, name: string ){
        this.mcf = mcf;
        this.mcName = name;
    }

    get texture(): string{
        return this.mcf.textruePic;
    }

    get res(): {[key: string]: SimpleRect} | null{
        return this.mcf.res;
    }

    get mc(): any{
        if( this.mcf.mc ){
            return this.mcf.mc[this.mcName];
        }
        return null;
    }
}
