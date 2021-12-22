/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-27 15:19:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-22 16:35:02
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
        return this.byTen(h) + ":" + this.byTen(m) + ":" + this.byTen(s);
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
}
