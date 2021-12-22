/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-22 15:52:21
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-22 16:38:25
 */
export function numberToColorString( num: number ): string{
    let numStr: string = num.toString( 16 );
    let needAddZero: number = 6 - numStr.length;
    let addArr: string[] = ["","0","00","000","0000","00000"];
    return "#" + addArr[needAddZero] + numStr;
}

function byTen( num: number ): string{
    return num < 10 ? "0" + num : "" + num;
}

export function dateToFormatString( dt: Date, formatStr: string ): string{
    let mmIsMonth: boolean = true;
    if( formatStr.match( /MM/g )?.length == 1 ){
        if( formatStr.indexOf( "DD" ) < 0 ) mmIsMonth = false;
    }
    if( formatStr.indexOf( "YYYY" ) >= 0 ) formatStr = formatStr.replace( "YYYY", "" + dt.getFullYear() );
    if( formatStr.indexOf( "MM" ) >= 0 ){
        if( mmIsMonth ) formatStr = formatStr.replace( "MM", byTen(dt.getMonth()+1) );
        else formatStr = formatStr.replace( "MM", byTen(dt.getMinutes()) );
    }
    if( formatStr.indexOf( "DD" ) >= 0 ) formatStr = formatStr.replace( "DD", byTen(dt.getDate()) );
    if( formatStr.indexOf( "HH" ) >= 0 ) formatStr = formatStr.replace( "HH", byTen(dt.getHours()) );
    if( formatStr.indexOf( "MM" ) >= 0 ) formatStr = formatStr.replace( "MM", byTen(dt.getMinutes()) );
    if( formatStr.indexOf( "SS" ) >= 0 ) formatStr = formatStr.replace( "SS", byTen(dt.getSeconds()) );
    return formatStr;
}