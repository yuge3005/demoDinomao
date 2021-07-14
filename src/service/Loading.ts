/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-14 13:16:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 13:22:04
 */
export class Loading {
    public static loadingStateHandler: Function;

    private static loadingLevel: number;
    public static set status( level: number ){
        this.loadingLevel = level;
        if( this.loadingStateHandler ) this.loadingStateHandler( level );
    }
    public static get status(): number{
        return this.loadingLevel;
    }
}
