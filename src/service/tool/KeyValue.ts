/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-29 14:45:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 14:09:36
 */
export class KeyValue {
    public static stringify( obj: any ): string{
        var str: string = "";
        for( var ob in obj ){
            if( str != "" ) str += "&";
            str += ob + "=" + obj[ob];
        }
        return str;
    }

    public static parse( str: string ): any{
        let keys = (str && str.split('&')) || [];
        var data: any = {};
        keys.map( (k) => {
          if (k !== '') {
              let keyValue = k.split('=');
              data[keyValue[0]] = keyValue[1];
          }
        });
        return data;
    }
}
