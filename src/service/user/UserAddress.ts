import { AddressData } from '../gameData/address-data';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:24:33
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 17:36:13
 */
export class UserAddress {

    public addressList: AddressData[] = [];

    public static instance: UserAddress;

    public static getData( addressList: AddressData[] ){
        this.instance = new UserAddress( addressList );
    }

    constructor( addressList: AddressData[] ){
        this.addressList = addressList;
    }
}
