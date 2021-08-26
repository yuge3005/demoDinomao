/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-25 15:18:27
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-26 10:50:14
 */
export class DailyBonus {

    public hasDailyBonus: boolean = false;
    public bonusList: number[] = [];
    public daysRow: number = 0;
    public bonusLevel: number[] = [];

    public static instance: DailyBonus;

    public static getData( bonusList: number[], collected: number, daysRow: number ){
        this.instance = new DailyBonus( bonusList, collected, daysRow );
    }

    constructor( bonusList: number[], collected: number, daysRow: number ){
        this.hasDailyBonus = collected != 0;
        this.bonusList = bonusList;
        this.daysRow = daysRow;
        this.bonusLevel = [];

        for( let i: number = 0; i < bonusList.length; i++ ){
            if( this.bonusLevel.indexOf( bonusList[i] ) == -1 ) this.bonusLevel.push( bonusList[i] );
        }
        this.bonusLevel.sort();
    }
}
