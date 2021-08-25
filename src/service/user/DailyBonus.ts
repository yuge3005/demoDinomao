/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-25 15:18:27
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-08-25 15:47:52
 */
export class DailyBonus {

    public hasDailyBonus: boolean = false;
    public bonusList: number[] = [];
    public daysRow: number = 0;

    public static instance: DailyBonus;

    public static getData( bonusList: number[], collected: number, daysRow: number ){
        this.instance = new DailyBonus;
        this.instance.hasDailyBonus = collected != 0;
        this.instance.bonusList = bonusList;
        this.instance.daysRow = daysRow;
    }
}
