import { trace } from './trace';
import { HttpRequest } from 'src/service/net/http-request';
import { FacebookData } from './../user/FacebookData';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-27 17:53:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-27 18:11:01
 */
export class Purchase {
    public static facebookPurchase( hash: string ){
        let ob = {
            hash: encodeURIComponent( hash ),
            seed: Math.floor(Math.random() * 100000000),
            fb: FacebookData.facebookId,
            debug: {}
        }
        new HttpRequest().loadData( "cmd.php?action=get_product_hash&" + HttpRequest.interfaceString, this.getProductHash.bind(this), "POST", "json="+JSON.stringify(ob) );
    }

    public static buy( hash: string ){
        if( HttpRequest.loginType == "facebook" ) this.facebookPurchase( hash );
    }
    
    public static getProductHash( data: any ){
        trace.log( data )
    }
}
