import { Easing } from './Easing';
import { Application } from '../settings/Application';
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-10-22 15:35:20
 * @description: Tween
 * @ 缓动
 */
export class Tween {

    /**
     * @param {*} target object to add tween
     * @param {number} duration tween duration(seconds)
     * @param {*} vars properties to change
     * @param {number} [delay=0] delay before tween(seconds)
     * @param {Function} [onComplete] complete callback
     * @param {string} [ease] ease mode, valid values are enumerated by Ease.
     * @memberof Tween
     * @description: Apply tween to the object
     * @ 对物体施加缓动
     */
    public static to( target: any, duration: number, vars: any, delay: number = 0, onComplete?: Function, ease?: string ){
        new Tween( target, duration, vars, delay, onComplete, ease );
    }

    /**
     * @param {*} target
     * @param {boolean} [stopAndEffect=false] if set the object to the tween end state
     * @return {*} 
     * @memberof Tween
     * @description: Stop the tween of the object
     * @ 停止物体的缓动
     */
    public static kill( target: any, stopAndEffect: boolean = false ){
        let index: number = this.masterList.indexOf( target );
        if( index < 0 ) return;
        if( !stopAndEffect ){
            clearTimeout( target.timeoutId );
            Tween.removeTween( this.tweenList[index] );
        }
        else{
            target.endTween();
        }
    }

    private static masterList: any[] = [];
    private static tweenList: Tween[] = [];

    private target: any;
    private duration: number;
    private startTime: number = 0;
    private vars: any;
    private originVars: any;
    private ease: string = "";
    private onComplete?: Function;

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

    constructor( target: any, duration: number, vars: any, delay: number, onComplete?: Function, ease?: string ){
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
        if( ease ) this.ease = ease;
        this.onComplete = onComplete;
        if( delay ){
            this.timeoutId = setTimeout( this.tweenStart.bind(this), Math.floor( delay*1000 ) );
        }
        else this.tweenStart();

        Tween.addTween( this );
    }

    private tweenStart(){
        this.startTime = Application.getTimer();
        this.timeoutId = setInterval( this.tweenMove.bind(this), 32 );
    }

    private tweenMove(){
        let nowAppTime: number = Application.getTimer();
        let t: number = nowAppTime - this.startTime;

        if( t >= this.duration ){
            this.endTween();
        }
        else{
            let percent: number = Easing.easing( this.ease )( t, 0, 1, this.duration );
            for( let ob in this.vars ){
                this.target[ob] = this.originVars[ob] + (this.vars[ob] - this.originVars[ob])*percent;
            }
        }
    }

    private endTween(){
        clearTimeout( this.timeoutId );
        for( let ob in this.vars ){
            this.target[ob] = this.vars[ob];
        }
        Tween.removeTween( this );
        if( this.onComplete ) this.onComplete();
    }
}
