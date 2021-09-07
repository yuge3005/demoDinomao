import { PopupVo } from '../gameData/popup-vo';
import { PopupVoType } from './../gameData/popup-vo-type';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-08-25 15:05:52
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-07 16:42:07
 */
export class InnerContent {
    static get welcomeBonus(): PopupVo{
        return { type: PopupVoType.WELCOME, art: "assets/welcome_bonus/welcome_bonus.json", products: [] };
    }

    static get dailyBonus(): PopupVo{
        return { type: PopupVoType.DAILY, art: "assets/daily_bonus/daily_bonus.json", products: [] };
    }

    static forceUpdate( url: string ): PopupVo{
        return { type: PopupVoType.FORCE_UPDATE, art: "assets/force_update/force_update.json", products: [{url: url}] };
    }
}
