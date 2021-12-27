/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-23 10:55:37
 * @description: Analysis of key value pairs
 * @ 键值对的解析
 */
export class KeyValue {

    /**
     * @static
     * @param {*} obj
     * @return {*}  {string}
     * @memberof KeyValue
     * @description: Convert an Object to key value pairs string, separated by '&'.
     * @ 把Obejct转换成键值对字符串，用'&'分隔。
     */
    public static stringify( obj: any ): string{
        var str: string = "";
        for( var ob in obj ){
            if( str != "" ) str += "&";
            str += ob + "=" + obj[ob];
        }
        return str;
    }

    /**
     * @static
     * @param {string} str
     * @return {*}  {*}
     * @memberof KeyValue
     * @description: Convert a string of key value pairs separated by '&' into object
     * @ 把一串用'&'分隔的键值对，转化为Object
     */
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
