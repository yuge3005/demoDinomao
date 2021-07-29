import { Loading } from 'src/service/gameUILogic/Loading';
import { GameLoginType } from './../gameData/GameLoginType';
import { GamePlatform } from './../gameData/GamePlatform';
import { trace } from './trace';
import { HttpRequest } from 'src/service/net/http-request';
import { FacebookData } from './../user/FacebookData';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-27 17:53:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-29 10:36:18
 */
export class Purchase {

    public static purchasing: boolean = false

    public static facebookPurchase( hash: string ){
        let ob = {
            hash: encodeURIComponent( hash ),
            seed: Math.floor(Math.random() * 100000000),
            fb: FacebookData.facebookId,
            debug: {}
        }
        new HttpRequest().loadData( "cmd.php?action=get_product_hash&" + HttpRequest.interfaceString, this.getProductHash.bind(this), "POST", "json="+JSON.stringify(ob) );
    }

    public static buy( product: any ){
        if( HttpRequest.platForm == GamePlatform.IOS ){
            eval( "window.webkit.messageHandlers.iosPurchase.postMessage(product.appleID)" );
            this.purchasing = true;
        }
        else if( HttpRequest.platForm == GamePlatform.ANDROID ){
            
        }
        else if( HttpRequest.loginType == GameLoginType.FACEBOOK && HttpRequest.platForm == GamePlatform.WEB ){
            this.facebookPurchase( product.hash );
            this.purchasing = true;
        }
    }
    
    public static getProductHash( data: any ){
        trace.log( data )
    }
}
