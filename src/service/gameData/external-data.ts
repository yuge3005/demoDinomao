/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-16 15:24:37
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-16 15:38:13
 */
export interface ExternalData {
    type: string;
    id: string;
    name: string;
    art: any[];
    triggers: any;
    products: productData[];
}
