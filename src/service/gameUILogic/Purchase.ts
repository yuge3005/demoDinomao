import { Point, Application } from '../../basicUI/basic-ui.module';
import { User } from '../user/User';
import { Trigger } from './Trigger';
import { KeyValue } from '../tool/KeyValue';
import { GameLoginType } from '../gameData/GameLoginType';
import { GamePlatform } from '../gameData/GamePlatform';
import { trace } from './trace';
import { HttpRequest } from '../net/http-request';
import { FacebookData } from '../user/FacebookData';
import { GM } from '../gameSetting/GM';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-27 17:53:20
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-01 09:41:52
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
        new HttpRequest().loadData( "cmd.php?action=get_product_hash&" + GM.interfaceString, this.getProductHash.bind(this), "POST", "json="+JSON.stringify(ob) );
    }

    public static buy( product: any, isVip: number = 0 ){
        if( GM.platForm == GamePlatform.IOS ){
            eval( "window.webkit.messageHandlers.iosPurchase.postMessage(product.appleID)" );
            this.purchasing = true;
            this.purchasingProduct = product;
            eval( "document.iosPurchase = this.iosPurchase.bind(this)" );
        }
        else if( GM.platForm == GamePlatform.ANDROID ){
            eval( "androidLogger.purchase(product.googlePlayID + ',' + isVip)" );
            this.purchasing = true;
            this.purchasingProduct = product;
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
            
            new HttpRequest().loadData( "cmd.php?action=mobile_user_purchase&" + GM.interfaceString, this.getIOSPurchaseFeedback.bind(this), "POST", "json="+JSON.stringify(ob) );
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

            new HttpRequest().loadData( "cmd.php?action=mobile_user_purchase&" + GM.interfaceString, this.getAndroidPurchaseFeedback.bind(this), "POST", KeyValue.stringify( ob ) );
            setTimeout(() => {
                trace.log( ob )
            }, 10);
        }
    }

    public static getIOSPurchaseFeedback( data: any ){
        trace.log( data )
        this.purchasing = false;
        if( data?.status == "ok" ){
            this.updateCoins( data.coins );
        }
    }

    public static getAndroidPurchaseFeedback( data: any ){
        trace.log( data )
        this.purchasing = false;
        if( data?.status == "ok"  ){
            this.updateCoins( data.coins );
            this.androidNeedActive();
        }
    }

    private static updateCoins( coinNumber: number ){
        Trigger.fly( 10, new Point().init( 500, 800 ), new Point().init( 185, 50 ), new Point().init( 0, 1200 ), 0.3, 0.4, 0.8 );
        User.instance.coins = coinNumber;
    }
    
    private static androidNeedActive(){
        if( Application.system.isApp() && !Application.system.isIOS ){
            this.intervalCount = 3;
            this.androidActive();
            this.intervalId = setInterval(this.androidActive.bind(this), 66);
        }
    }

    public static intervalCount: number;
    public static intervalId: any;

    public static androidActive(){
        eval( "androidLogger.needActive('true')" );
        this.intervalCount--;
        if( this.intervalCount < 0 ) clearInterval( this.intervalId );
    }
}
