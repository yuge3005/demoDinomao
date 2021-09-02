import { CategoryData } from './../gameData/category-data';
import { GoodsData } from '../gameData/goods-data';
import { GameConfig } from './GameConfig';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-13 16:37:04
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-02 17:45:56
 */
export class GM {

    public static configs: GameConfig;

    public static muchineList: GoodsData[] = [];//didn't use by now
    public static categorys: CategoryData[] = [];

    public static platForm: string = 'com';
    public static loginType: string;
    public static interfaceString: string;
}
