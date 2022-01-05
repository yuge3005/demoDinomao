/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-22 16:55:53
 * @description: Tools for string formatting
 * @ 字符串格式化工具
 */
export class StringTransform{

    /**
     * @static
     * @param {number} num
     * @return {*}  {string}
     * @memberof StringTransform
     * @description: Convert numbers to color values.
     * @ 转化数字成颜色值
     */
    static numberToColorString( num: number ): string{
        let numStr: string = num.toString( 16 );
        let needAddZero: number = 6 - numStr.length;
        let addArr: string[] = ["","0","00","000","0000","00000"];
        return "#" + addArr[needAddZero] + numStr;
    }

    private static byTen( num: number ): string{
        return num < 10 ? "0" + num : "" + num;
    }

    /**
     * @static
     * @param {Date} dt date
     * @param {string} formatStr format
     * @return {*}  {string}
     * @memberof StringTransform
     * @description: Outputs a string of the specified format for the date object.
     * @ 输出日期对象的指定格式的字符串
     */
    static dateToFormatString( dt: Date, formatStr: string ): string{
        let mmIsMonth: boolean = true;
        if( formatStr.match( /MM/g )?.length == 1 ){
            if( formatStr.indexOf( "DD" ) < 0 ) mmIsMonth = false;
        }
        if( formatStr.indexOf( "YYYY" ) >= 0 ) formatStr = formatStr.replace( "YYYY", "" + dt.getFullYear() );
        if( formatStr.indexOf( "MM" ) >= 0 ){
            if( mmIsMonth ) formatStr = formatStr.replace( "MM", this.byTen(dt.getMonth()+1) );
            else formatStr = formatStr.replace( "MM", this.byTen(dt.getMinutes()) );
        }
        if( formatStr.indexOf( "DD" ) >= 0 ) formatStr = formatStr.replace( "DD", this.byTen(dt.getDate()) );
        if( formatStr.indexOf( "HH" ) >= 0 ) formatStr = formatStr.replace( "HH", this.byTen(dt.getHours()) );
        if( formatStr.indexOf( "MM" ) >= 0 ) formatStr = formatStr.replace( "MM", this.byTen(dt.getMinutes()) );
        if( formatStr.indexOf( "SS" ) >= 0 ) formatStr = formatStr.replace( "SS", this.byTen(dt.getSeconds()) );
        return formatStr;
    }
    
    /**
     * @static
     * @param {number} second
     * @return {*}  {string}
     * @memberof StringTransform
     * @description: Convert seconds to string, 'hour : minute : second'
     * @ 将秒数转为时分秒字符串,00:00:00
     */
    static secondToHour(second: number): string {
        let h = Math.floor(second / 3600),
            m = Math.floor(second % 3600 / 60),
            s = Math.floor(second % 60);
        return this.byTen(h) + ":" + this.byTen(m) + ":" + this.byTen(s);
    }

    /**
     * @static
     * @param {string} utcDateString
     * @return {*}  {Date}
     * @memberof StringTransform
     * @description: UTC time string to date
     * @ 字符串转日期
     */
    public static transformUTCStringToDate(utcDateString: string): Date {
        let utcDate = new Date();
        utcDate.setUTCFullYear(Number(utcDateString.substring(0, 4)), Number(utcDateString.substring(5, 7)) - 1, Number(utcDateString.substring(8, 10)));
        utcDate.setUTCHours(Number(utcDateString.substring(11, 13)), Number(utcDateString.substring(14, 16)), Number(utcDateString.substring(17, 19)));

        return utcDate;
    }

    /**
     * @static
     * @param {number} timeStamp
     * @return {*}  {Date}
     * @memberof StringTransform
     * @description: Time stamp to utc date
     * @ 时间戳转国际时间
     */
    public static getUTCDateByTimeStamp( timeStamp: number ): Date{
        let tempData: Date = new Date(timeStamp);
        let timeStr: string = tempData.getFullYear() + "-" + this.byTen( tempData.getMonth() + 1 ) + "-" + this.byTen( tempData.getDate() )
      + " " + this.byTen( tempData.getHours() ) + ":" + this.byTen( tempData.getMinutes() ) + ":" + this.byTen( tempData.getSeconds() );
      return this.transformUTCStringToDate( timeStr );
    }
}

