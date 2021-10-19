import { Ease } from './Ease';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-19 09:42:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-19 10:39:58
 */
export class Easing {

    public static easing( easeKey: string ): Function{
        let func: Function;
        switch( easeKey ){
            case Ease.Linear: func = this.Linear;
                break;
            default: func = this.RegularEaseOut;
                break;
        }
        return func;
    }

    public static Linear: Function = function easeNone (t:number, b:number, c:number, d:number):number {
        return c*t/d + b;
    }

    public static RegularEaseOut: Function = function easeNone (t:number, b:number, c:number, d:number):number {
        return 1 - (t = 1 - (t / d)) * t;
    }
}
