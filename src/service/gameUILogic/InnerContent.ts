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
 * @LastEditTime: 2021-12-27 16:26:04
 */
export class InnerContent {
    static get welcomeBonus(): PopupVo{
        return { type: PopupVoType.WELCOME, art: "assets/common_popups/welcome_bonus/welcome_bonus.json", products: [] };
    }

    static get dailyBonus(): PopupVo{
        return { type: PopupVoType.DAILY, art: "assets/daily_bonus/daily_bonus.json", products: [] };
    }

    static get getVip(): PopupVo{
        return { type: PopupVoType.GET_VIP, art: "assets/common_popups/getVip/getVip.json", products: [] };
    }

    static forceUpdate( url: string ): PopupVo{
        return { type: PopupVoType.FORCE_UPDATE, art: "assets/common_popups/force_update/force_update.json", products: [{url}] };
    }

    static productInfo( product: GoodsData ): PopupVo{
        return { type: PopupVoType.PRODUCT_INFO, art: "assets/common_popups/productInfo/productInfo.json", products: [{product}] }
    }

    static get logout(): PopupVo{
        return { type: PopupVoType.LOGOUT, art: "assets/common_popups/logout/logout.json", products: [] };
    }

    static afterPurchase( coins: number ): PopupVo{
        return { type: PopupVoType.PURCHASE_SUCCESS, art: "assets/common_popups/purchase_success/purchase_success.json", products: [{coins}] };
    }

    static resultFailed( score: number, price: number, callback: Function ){
        return { type: PopupVoType.RESULT_FAILED, art: "assets/common_popups/result/result_failed.json", products: [{score, time: Application.getTimer(), price, callback}] };
    }

    static resultWin( img: string, price: number, callback: Function ){
        return { type: PopupVoType.RESULT_WIN, art: "assets/common_popups/result/result_win.json", products: [{img, time: Application.getTimer(), price, callback}] };
    }

    static deleteAddress( callback: Function ){
        return { type: PopupVoType.DELETE_ADDRESS, art: "assets/address/delete_address/delete_address.json", products: [{callback}] };
    }

    static missAddressInfo( missingStr: string ){
        return { type: PopupVoType.MISS_ADDRESS_INFO, art: "assets/address/address_info_miss/address_info_miss.json", products: [{missingStr}] };
    }

    static exchange( exchange: string, callback: Function ): PopupVo{
        return { type: PopupVoType.EXCHANGE, art: "assets/common_popups/exchange/exchange.json", products: [{exchange, callback}] };
    }

    static videoError( errorStr: string ){
        return { type: PopupVoType.VIDEO_ERROR, art: "assets/common_popups/video_error/videoError.json", products: [{errorStr}] };
    }
}
