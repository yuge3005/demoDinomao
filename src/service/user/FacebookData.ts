/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-02 11:13:56
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-27 16:48:46
 */
export class FacebookData {

    private static data: any;

    public static getData( facebookData: any ){
        this.data = facebookData;
    }

    public static get facebookId(): string{
        return this.data.id;
    }

    public static getFacebookHeadImageUrlById( id: string, size: number = 50 ): string{
        var str: string = "https://graph.facebook.com/";
        str += id;
        str += "/picture/?width=" + size + "&height=" + size;
        return str;
    }
}
