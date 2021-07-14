/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-02 11:13:56
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-02 11:17:33
 */
export class FacebookHeadImage {
    public static getFacebookHeadImageUrlById( id: string, size: number = 50 ): string{
        var str: string = "https://graph.facebook.com/";
        str += id;
        str += "/picture/?width=" + size + "&height=" + size;
        return str;
    }
}
