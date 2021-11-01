/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-25 15:18:27
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-01 15:52:06
 */
export class DailyBonus {

    public _hasDailyBonus: boolean = false;
    public get hasDailyBonus(): boolean{
        return this._hasDailyBonus;
    }
    public set hasDailyBonus( value: boolean ){
        this._hasDailyBonus = value;
        if( DailyBonus.bonusChange ) DailyBonus.bonusChange();
    }
    public bonusList: number[] = [];
    public daysRow: number = 0;
    public bonusLevel: number[] = [];

    public static instance: DailyBonus;

    public static getData( bonusList: number[], collected: number, daysRow: number ){
        this.instance = new DailyBonus( bonusList, collected, daysRow );
        if( this.bonusChange ) this.bonusChange();
    }

    public static bonusChange: Function | null;

    constructor( bonusList: number[], collected: number, daysRow: number ){
        this._hasDailyBonus = collected != 0;
        this.bonusList = bonusList;
        this.daysRow = daysRow;
        this.bonusLevel = [];

        for( let i: number = 0; i < bonusList.length; i++ ){
            if( this.bonusLevel.indexOf( bonusList[i] ) == -1 ) this.bonusLevel.push( bonusList[i] );
        }
        this.bonusLevel.sort();
    }
}
