import { Application } from '../settings/Application';
import { Ease } from './Ease';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-18 14:45:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-18 17:11:36
 */
export class Tween {
    public static to( target: any, duration: number, vars: any, delay: number = 0, ease: Function = Ease.Linear ){
        new Tween( target, duration, vars, delay, ease );
    }

    public static masterList: any[] = [];
    public static tweenList: Tween[] = [];

    private target: any;
    private timeLeft: number;
    private vars: any;
    private originVars: any;
    private ease: Function;

    private timeoutId: any;
    private lastAppTime: number = 0;

    private easeB: number = 0;
    private easeC: number = 0;
    private easeD: number = 0;

    private static addTween( tw: Tween ){
        this.masterList.push( tw.target );
        this.tweenList.push( tw );
    }

    private static removeTween( tw: Tween ){
        let index: number = this.tweenList.indexOf( tw );
        this.masterList.splice( index, 1 );
        this.tweenList.splice( index, 1 );
    }

    constructor( target: any, duration: number, vars: any, delay: number, ease: Function ){
        if (target == null) {
            throw new Error("Cannot tween a null object.");
        }
        this.target = target;
        this.timeLeft = duration;
        this.vars = vars;
        this.originVars = {};
        for( let ob in vars ){
            this.originVars[ob] = this.target[ob];
        }
        this.ease = ease;
        if( delay ){
            this.timeoutId = setTimeout( this.tweenStart.bind(this), Math.floor( delay*1000 ) );
        }
        else this.tweenStart();

        Tween.addTween( this );
    }

    private tweenStart(){
        this.lastAppTime = Application.getTimer();
        this.easeC = 1 / this.timeLeft;
        this.timeoutId = setTimeout( this.tweenMove.bind(this), 33 );
    }

    private tweenMove(){
        let nowAppTime: number = Application.getTimer();
        let t: number = nowAppTime - this.lastAppTime;
        this.easeB += Ease.Linear( t, this.easeB, this.easeC, this.timeLeft );
        this.lastAppTime = nowAppTime;
        this.timeLeft -= t;

        if( this.timeLeft > 0 ) this.timeoutId = setTimeout( this.tweenMove.bind(this), 33 );
        else {
            this.endTween();
        }
    }

    private endTween(){
        clearTimeout( this.timeoutId );
        for( let ob in this.vars ){
            this.target[ob] = this.vars[ob];
        }
        Tween.removeTween( this );
    }
}
