/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-22 15:52:21
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-22 15:57:20
 */
export function numberToColorString( num: number ): string{
    let numStr: string = num.toString( 16 );
    let needAddZero: number = 6 - numStr.length;
    let addArr: string[] = ["","0","00","000","0000","00000"];
    return "#" + addArr[needAddZero] + numStr;
}
