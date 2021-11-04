import { AddressData } from '../gameData/address-data';
/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-11-02 13:24:33
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-04 09:33:09
 */
export class UserAddress {

    public addressList: AddressData[] = [];

    public static instance: UserAddress;
    public static addressChangeCallback: Function | null;

    public static getData( addressList: AddressData[] ){
        this.instance = new UserAddress( addressList );
        if( this.addressChangeCallback ) this.addressChangeCallback();
    }

    constructor( addressList: AddressData[] ){
        this.addressList = addressList;
    }
}
