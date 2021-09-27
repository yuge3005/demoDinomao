/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-27 15:19:00
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-27 15:45:56
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
}
