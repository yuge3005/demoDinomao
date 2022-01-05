import { User } from '../user/User';
import { Trigger } from './Trigger';
import { KeyValue } from '../../basicUI/basic-ui.module';
import { GameLoginType } from '../gameData/GameLoginType';
import { GamePlatform } from '../gameData/GamePlatform';
import { trace } from './trace';
import { GameHttp } from '../net/game-http';
import { FacebookData } from '../user/FacebookData';
import { GM } from '../gameSetting/GM';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-27 17:53:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-27 16:34:45
 */
export class Purchase {

    public static purchasing: boolean = false
    public static purchasingProduct: any;
    public static isVip: number;

    public static facebookPurchase( hash: string ){
        let ob = {
            hash: encodeURIComponent( hash ),
            seed: Math.floor(Math.random() * 100000000),
            fb: FacebookData.facebookId,
            debug: {}
        }
        new GameHttp().loadData( "cmd.php?action=get_product_hash&" + GM.interfaceString, this.getProductHash.bind(this), "POST", "json="+JSON.stringify(ob) );
    }

    public static buy( product: any, isVip: number = 0 ){
        this.isVip = isVip;
        this.purchasingProduct = product;
        if( GM.platForm == GamePlatform.IOS ){
            eval( "window.webkit.messageHandlers.iosPurchase.postMessage(product.appleID)" );
            this.purchasing = true;
            eval( "document.iosPurchase = this.iosPurchase.bind(this)" );
        }
        else if( GM.platForm == GamePlatform.ANDROID ){
            eval( "androidLogger.purchase(product.googlePlayID + ',' + isVip)" );
            this.purchasing = true;
            eval( "document.androidPurchase = this.androidPurchase.bind(this)" );
        }
        else if( GM.platForm == GamePlatform.WEB ){
            if( GM.loginType == GameLoginType.FACEBOOK ){
                alert( "we dont suport this" );
                // this.purchasing = true;
                // this.facebookPurchase( product.hash );
            }
            else alert( "we dont suport this" );
        }
        else alert( "we dont suport this" );
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
                transaction_id : str.substring( str.indexOf("<") + 1, str.indexOf(">") ),
                product_price: this.purchasingProduct.price,
                product_currency: this.purchasingProduct.currency
            }
            
            new GameHttp().loadData( "cmd.php?action=mobile_user_purchase&" + GM.interfaceString, this.getIOSPurchaseFeedback.bind(this), "POST", "json="+JSON.stringify(ob) );
            setTimeout(() => {
                trace.log( ob )
            }, 10);
        }
    }

    public static androidPurchase( str: String ){
        if( str.startsWith( "faild" ) ){
            this.purchasing = false;
        }
        else if( str.startsWith( "ok" ) ){
            let purchaseStr: string = str.substring( str.indexOf("{") );
            let purchaseJson: any = JSON.parse( purchaseStr );
            var ob = {
                hash: encodeURIComponent( this.purchasingProduct.hash ),
                receipt: encodeURIComponent( str.substring( str.indexOf("{") ) ),
                transaction_id: purchaseJson.orderId
            }

            new GameHttp().loadData( "cmd.php?action=mobile_user_purchase&" + GM.interfaceString, this.getAndroidPurchaseFeedback.bind(this), "POST", KeyValue.stringify( ob ) );
            setTimeout(() => {
                trace.log( ob )
            }, 10);
        }
    }

    public static getIOSPurchaseFeedback( data: any ){
        this.afterPurchase( data );
    }

    public static getAndroidPurchaseFeedback( data: any ){
        this.afterPurchase( data );
    }

    private static afterPurchase( data: any ){
        trace.log( data )
        this.purchasing = false;
        if( data?.status == "ok" ){
            Trigger.popupManager.showPurchaseSuccess( data.coins );
            if( data.type.indexOf( "subscription" ) >=0 ){
                User.instance.isVip = true;
                User.instance.vipData = { startTime: data.vip_start_time, endTime: data.vip_end_time, level: data.vip_level };
            }
            trace.report( "buySuccess", ( this.isVip ? "subscribe" : "consumables" ) + "_" + this.purchasingProduct.price );
            trace.firebaseReport( "buySuccess", ( this.isVip ? "subscribe" : "consumables" ) + "_" + this.purchasingProduct.price );
        }
    }
}
