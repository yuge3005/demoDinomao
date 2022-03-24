import { AddressData } from '../gameData/dataTypes';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:24:33
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-10 09:59:27
 */
export class UserAddress {

    public addressList: AddressData[] = [];

    public static instance: UserAddress;
    public static addressChangeCallback: Function | null;

    public static fromPage: string;

    public static getData( addressList: AddressData[] ){
        this.instance = new UserAddress( addressList );
        if( this.addressChangeCallback ) this.addressChangeCallback();
    }

    constructor( addressList: AddressData[] ){
        this.addressList = addressList;
    }
}
