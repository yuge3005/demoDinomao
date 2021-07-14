/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-05-21 14:00:01
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-14 14:10:12
 */
export interface MachineData {
  img: string,
  mac_addr: string,
  rd_url1: string,
  rd_url2: string,
  rtc_url1: string,
  rtc_url2: string,
  good_id: number,
  power: number,
  price: number,
  name: string,
  mac_id: number,
  imgLoaded: boolean
}
