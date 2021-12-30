/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-30 09:44:07
 * @description: CSS style for some special feature.
 * @ 提供特殊用途的css。
 * @example in component: "this.myCss = StyleX.borderRadius(15);", and in template: "<div [ngStyle]='myCss'>"
 */
export class StyleX {

    /**
     * @static
     * @param {number} radius
     * @return {*} {Object}
     * @memberof StyleX
     * @description: border radius
     * @ 圆角边框
     */
    public static borderRadius( radius: number, overflowHidden: boolean = true ): Object{
        let str: string = radius + 'px';
        let obj: any = { '-moz-border-radius': str, '-webkit-border-radius': str, 'border-radius': str };
        if( overflowHidden ) obj.overflow = 'hidden';
        return obj;
    }

    /**
     * @static
     * @param {number} x
     * @param {number} y
     * @return {*} 
     * @memberof StyleX
     * @description set the htmlelement position to (x,y)
     * @ 设置网页对象的坐标到(x,y)
     */
    public static setItemPosition( x: number, y: number ){
        return { 'left': x + 'px', 'top': y + 'px' };
    }
}
