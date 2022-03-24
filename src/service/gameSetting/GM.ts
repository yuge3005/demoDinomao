import { CategoryData, GoodsData } from '../gameData/dataTypes';
import { GameConfig } from './GameConfig';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-13 16:37:04
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-17 09:36:26
 */
export class GM {

    public static configs: GameConfig;

    public static muchineList: GoodsData[] = [];//didn't use by now
    public static categorys: CategoryData[] = [];
    public static ticketGoodslist: GoodsData[] = [];

    public static platForm: string = 'com';
    public static loginType: string;
    public static interfaceString: string;
}
