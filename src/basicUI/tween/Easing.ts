import { Ease } from './Ease';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-19 09:42:55
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-19 11:17:07
 */
export class Easing {

    public static easing( easeKey: string ): Function{
        let func: Function;
        switch( easeKey ){
            case Ease.Linear: func = this.Linear; break;
            case Ease.BackEaseIn: func = this.BackEaseIn; break;
            case Ease.BackEaseOut: func = this.BackEaseOut; break;
            case Ease.BackEaseInOut: func = this.BackEaseInOut; break;
            case Ease.BounceEaseIn: func = this.BounceEaseIn; break;
            case Ease.BounceEaseOut: func = this.BounceEaseOut; break;
            case Ease.BounceEaseInOut: func = this.BounceEaseInOut; break;
            case Ease.CircEaseIn: func = this.CircEaseIn; break;
            case Ease.CircEaseOut: func = this.CircEaseOut; break;
            case Ease.CircEaseInOut: func = this.CircEaseInOut; break;
            case Ease.CubicEaseIn: func = this.CubicEaseIn; break;
            case Ease.CubicEaseOut: func = this.CubicEaseOut; break;
            case Ease.CubicEaseInOut: func = this.CubicEaseInOut; break;
            default: func = this.RegularEaseOut; break;
        }
        return func;
    }

    public static Linear (t:number, b:number, c:number, d:number):number {
        return c*t/d + b;
    }

    public static RegularEaseOut (t:number, b:number, c:number, d:number):number {
        return 1 - (t = 1 - (t / d)) * t;
    }

    public static BackEaseIn (t:number, b:number, c:number, d:number, s:number = 1.70158):number {
        return c*(t/=d)*t*((s+1)*t - s) + b;
    }

    public static BackEaseOut (t:number, b:number, c:number, d:number, s:number = 1.70158):number {
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }

    public static BackEaseInOut (t:number, b:number, c:number, d:number, s:number = 1.70158):number {
        if ((t/=d*0.5) < 1) return c*0.5*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }

    public static BounceEaseOut (t:number, b:number, c:number, d:number):number {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    }

    public static BounceEaseIn (t:number, b:number, c:number, d:number):number {
        return c - this.BounceEaseOut(d-t, 0, c, d) + b;
    }
    
    public static BounceEaseInOut (t:number, b:number, c:number, d:number):number {
        if (t < d*0.5) return this.BounceEaseIn (t*2, 0, c, d) * .5 + b;
        else return this.BounceEaseOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
    }

    public static CircEaseIn (t:number, b:number, c:number, d:number):number {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    }
    public static CircEaseOut (t:number, b:number, c:number, d:number):number {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    }
    public static CircEaseInOut (t:number, b:number, c:number, d:number):number {
        if ((t/=d*0.5) < 1) return -c*0.5 * (Math.sqrt(1 - t*t) - 1) + b;
        return c*0.5 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    }
		
    public static CubicEaseIn (t:number, b:number, c:number, d:number):number {
        return c*(t/=d)*t*t + b;
    }
    public static CubicEaseOut (t:number, b:number, c:number, d:number):number {
        return c*((t=t/d-1)*t*t + 1) + b;
    }
    public static CubicEaseInOut (t:number, b:number, c:number, d:number):number {
        if ((t/=d*0.5) < 1) return c*0.5*t*t*t + b;
        return c*0.5*((t-=2)*t*t + 2) + b;
    }
}
