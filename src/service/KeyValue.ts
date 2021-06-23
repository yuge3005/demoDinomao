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
