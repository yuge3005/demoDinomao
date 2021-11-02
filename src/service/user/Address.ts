import { AddressData } from '../gameData/address-data';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:24:33
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-02 13:50:35
 */
export class Address {

    public addressList: AddressData[] = [];

    public static instance: Address;

    public static getData( addressList: AddressData[] ){
        this.instance = new Address( addressList );
    }

    constructor( addressList: AddressData[] ){
        this.addressList = addressList;
    }
}
