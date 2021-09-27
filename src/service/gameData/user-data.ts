import { VipData } from './vip-data';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-29 14:45:12
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-09-27 14:22:02
 */
export interface UserData {
  id: string;
  headimg: string;
  score: number;
  coins: number;
  play_tickets: number;
  is_vip: boolean;
  is_new: boolean;
  is_free: boolean;
  name: string;
  vipData: VipData;
}
