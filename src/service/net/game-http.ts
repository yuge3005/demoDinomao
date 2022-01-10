import { HttpRequest } from 'resize-able-ui';
import { GM } from '../gameSetting/GM';
/*
 * @Description:
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-06-08 12:03:07
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2022-01-05 11:36:54
 */
export class GameHttp extends HttpRequest {

  constructor(){
    super();
  }

  loadData( url: string, callback: Function | any, method: string = "GET", data: any ){
    super.loadData( GM.configs.dataServerUrl + url, callback, method, data );
  }
}
