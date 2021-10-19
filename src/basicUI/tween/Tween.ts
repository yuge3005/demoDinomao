import { Easing } from './Easing';
import { Application } from '../settings/Application';
import { Ease } from './Ease';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-10-18 14:45:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-10-19 10:35:00
 */
export class Tween {
    public static to( target: any, duration: number, vars: any, delay: number = 0, ease: string = "" ){
        new Tween( target, duration, vars, delay, ease );
    }

    public static masterList: any[] = [];
    public static tweenList: Tween[] = [];

    private target: any;
    private duration: number;
    private startTime: number = 0;
    private vars: any;
    private originVars: any;
    private ease: string;

    private timeoutId: any;

    private static addTween( tw: Tween ){
        this.masterList.push( tw.target );
        this.tweenList.push( tw );
    }

    private static removeTween( tw: Tween ){
        let index: number = this.tweenList.indexOf( tw );
        this.masterList.splice( index, 1 );
        this.tweenList.splice( index, 1 );
    }

    constructor( target: any, duration: number, vars: any, delay: number, ease: string ){
        if (target == null) {
            throw new Error("Cannot tween a null object.");
        }
        this.target = target;
        this.duration = Math.floor( duration * 1000 );
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
        this.startTime = Application.getTimer();
        this.timeoutId = setTimeout( this.tweenMove.bind(this), 33 );
    }

    private tweenMove(){
        let nowAppTime: number = Application.getTimer();
        let t: number = nowAppTime - this.startTime;
        let percent: number = Easing.easing( this.ease )( t, 0, 1, this.duration );
        for( let ob in this.vars ){
            this.target[ob] = this.originVars[ob] + (this.vars[ob] - this.originVars[ob])*percent;
        }

        if( t < this.duration ) this.timeoutId = setTimeout( this.tweenMove.bind(this), 33 );
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
