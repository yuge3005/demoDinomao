/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-27 15:19:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-10 16:34:22
 */
export class FormartDatas {
    public static transformUTCStringToDate(utcDateString: string): Date {
        let utcDate = new Date();
        utcDate.setUTCFullYear(Number(utcDateString.substring(0, 4)), Number(utcDateString.substring(5, 7)) - 1, Number(utcDateString.substring(8, 10)));
        utcDate.setUTCHours(Number(utcDateString.substring(11, 13)), Number(utcDateString.substring(14, 16)), Number(utcDateString.substring(17, 19)));

        return utcDate;
    }

    public static secondToHour(second: number): string {
        let h = Math.floor(second / 3600),
            m = Math.floor(second % 3600 / 60),
            s = Math.floor(second % 60);

        return (h<10?"0":"") + h + ":" + (m<10?"0":"") + m + ":" + (s<10?"0":"") + s;
    }

    public static getUTCDateByTimeStamp( timeStamp: number ): Date{
        let tempData: Date = new Date(timeStamp);
        let timeStr: string = tempData.getFullYear() + "-" + this.byTen( tempData.getMonth() + 1 ) + "-" + this.byTen( tempData.getDate() )
      + " " + this.byTen( tempData.getHours() ) + ":" + this.byTen( tempData.getMinutes() ) + ":" + this.byTen( tempData.getSeconds() );
      return this.transformUTCStringToDate( timeStr );
    }

    private static byTen( num: number ): string{
        return num < 10 ? "0" + num : "" + num;
    }

    public static toFormatString( dt: Date, formatStr: string ): string{
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
}
