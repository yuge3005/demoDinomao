import { SimplePoint } from '../geom/SimplePoint';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-27 13:43:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-16 10:44:37
 */
export interface SimpleMovieClipTexture {
    duration: number,
    width: number,
    height: number,
    frames: SimplePoint[]
}
