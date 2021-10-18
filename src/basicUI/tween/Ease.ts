/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-18 16:00:45
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-18 16:04:31
 */
export class Ease {
    public static Linear: Function = function easeNone (t:number, b:number, c:number, d:number):number {
        return c*t/d + b;
    }
}
