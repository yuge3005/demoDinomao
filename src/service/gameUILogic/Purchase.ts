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
 * @LastEditTime: 2021-07-29 14:53:58
 */
export class Purchase {

    public static purchasing: boolean = false
    public static purchasingProduct: any;

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
            this.purchasingProduct = product;
            eval( "document.iosPurchase = this.iosPurchase.bind(this)" );
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

    public static iosPurchase( str: string ){
        if( str.startsWith( "faild" ) ){
            this.purchasing = false;
        }
        else if( str.startsWith( "ok" ) ){
            var ob = {
                hash: encodeURIComponent( this.purchasingProduct.hash ),
                receipt: encodeURIComponent( str.substr( str.indexOf(">") + 1 ) ),
                transaction_id : "" + parseInt( str.substring( str.indexOf("0x") + 2, str.indexOf(">") ), 16 ),
            }
            
            new HttpRequest().loadData( "cmd.php?action=mobile_user_purchase&" + HttpRequest.interfaceString, this.getIOSPurchaseFeedback.bind(this), "POST", "json="+JSON.stringify(ob) );
        }
        setTimeout(() => {
            trace.log( ob )
        }, 10);
    }

    public static getIOSPurchaseFeedback( data: any ){
        trace.log( data )
        this.purchasing = false;
    }
}
