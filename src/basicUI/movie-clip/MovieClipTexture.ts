import { SimplePoint } from './../geom/SimplePoint';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-27 13:43:40
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-30 17:54:37
 */
export interface MovieClipTexture {
    duration: number,
    width: number,
    height: number,
    frames: SimplePoint[]
}
