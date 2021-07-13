/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-07-01 11:34:43
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-07-13 17:55:30
 */
export class ControlDirection {
    public static LEFT: string = "left";
    public static UP: string = "back";
    public static RIGHT: string = "right";
    public static DOWN: string = "front";

    public static direct2( str: string, direct: number = 1 ): string{
        if( direct == 2 ){
            let newStr: string = "";
            switch(str){
                case this.LEFT: newStr = this.DOWN;
                    break;
                case this.UP: newStr = this.LEFT;
                    break;
                case this.RIGHT: newStr = this.UP;
                    break;
                case this.DOWN: newStr = this.RIGHT;
                    break;
            }
            return newStr;
        }
        else return str;
    }
}
