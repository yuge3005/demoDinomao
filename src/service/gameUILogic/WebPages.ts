/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-09-02 11:56:43
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-11-09 17:31:49
 */
export class WebPages {
    public static LOGIN: string = "login";
    public static LOBBY: string = "lobby";
    public static VIDEO: string = "video";
    public static SHOP: string = "shop";
    public static USER_CENTER: string = "userCenter";
    public static ABOUT_US: string = "aboutUs";
    public static SETTINGS: string = "soundAndLogout";
    public static INVITE: string = "invitePage";
    public static CONTACT: string = "contact";
    public static START_UP: string = "startUp";
    public static VIDEO_RECORD: string = "videoRecord";
    public static RECORD_PLAY: string = "recordPlay";
    public static LEDGER: string = "ledger";
    public static ADDRESS: string = "address";
    public static EDIT_ADDRESS: string = "editAddress";
    public static ORDER: string = "order";
    public static PRIZE: string = "prize";

    public static pageHeadAndBotton( page: string ): boolean[]{
        switch(page){
            case this.LOBBY:
            case this.SHOP:
            case this.PRIZE:
                return [ true, true ];
            case this.VIDEO:
            case this.ADDRESS:
            case this.CONTACT:
            case this.EDIT_ADDRESS:
                return [ true, false ];
            case this.USER_CENTER:
                return [ false, true ];
            default:
                return [ false, false ];
        }
    }

    public static pageMenuIndex( page: string ): number{
        switch(page){
            case this.LOBBY: return 0;
            case this.SHOP: return 1;
            case this.PRIZE: return 2;
            case this.USER_CENTER: return 3;
            default: return 0;
        }
    }
}
