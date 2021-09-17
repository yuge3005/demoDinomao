import { SimplePoint } from '../geom/SimplePoint';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-27 13:43:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-16 17:58:31
 */
export interface MovieClipTexture {
    duration: number,
    width: number,
    height: number,
    frames: SimplePoint[]
}
