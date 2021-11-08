import { Application } from '../../basicUI/basic-ui.module';
import { GoodsData } from '../gameData/goods-data';
import { PopupVo } from '../gameData/popup-vo';
import { PopupVoType } from '../gameData/popup-vo-type';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-25 15:05:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-08 15:16:53
 */
export class InnerContent {
    static get welcomeBonus(): PopupVo{
        return { type: PopupVoType.WELCOME, art: "assets/welcome_bonus/welcome_bonus.json", products: [] };
    }

    static get dailyBonus(): PopupVo{
        return { type: PopupVoType.DAILY, art: "assets/daily_bonus/daily_bonus.json", products: [] };
    }

    static get getVip(): PopupVo{
        return { type: PopupVoType.GET_VIP, art: "assets/getVip/getVip.json", products: [] };
    }

    static forceUpdate( url: string ): PopupVo{
        return { type: PopupVoType.FORCE_UPDATE, art: "assets/force_update/force_update.json", products: [{url}] };
    }

    static productInfo( product: GoodsData ): PopupVo{
        return { type: PopupVoType.PRODUCT_INFO, art: "assets/productInfo/productInfo.json", products: [{product}] }
    }

    static get logout(): PopupVo{
        return { type: PopupVoType.LOGOUT, art: "assets/logout/logout.json", products: [] };
    }

    static afterPurchase( coins: number ): PopupVo{
        return { type: PopupVoType.PURCHASE_SUCCESS, art: "assets/purchase_success/purchase_success.json", products: [{coins}] };
    }

    static resultFailed( score: number, price: number, callback: Function ){
        return { type: PopupVoType.RESULT_FAILED, art: "assets/result/result_failed.json", products: [{score, time: Application.getTimer(), price, callback}] };
    }

    static resultWin( img: string, price: number, callback: Function ){
        return { type: PopupVoType.RESULT_WIN, art: "assets/result/result_win.json", products: [{img, time: Application.getTimer(), price, callback}] };
    }

    static deleteAddress( callback: Function ){
        return { type: PopupVoType.DELETE_ADDRESS, art: "assets/address/delete_address/delete_address.json", products: [{callback}] };
    }
}
