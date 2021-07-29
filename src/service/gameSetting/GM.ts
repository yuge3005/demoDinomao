import { GoodsData } from '../gameData/goods-data';
import { GameConfig } from './GameConfig';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-13 16:37:04
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-20 11:51:39
 */
export class GM {

    public static configs: GameConfig;

    public static muchineList: GoodsData[] = [];

    public static platForm: string = 'com';
    public static loginType: string;
    public static interfaceString: string;
}
