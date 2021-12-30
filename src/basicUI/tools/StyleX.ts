import { Rectangle } from '../geom/rectangle';
import { Point } from '../geom/point';
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
     * @description: set the htmlelement position to (x,y)
     * @ 设置网页对象的坐标到(x,y)
     */
    public static setItemPosition( x: number, y: number ): Object{
        return { 'left': x + 'px', 'top': y + 'px' };
    }

    /**
     * @static
     * @param {Point} pt
     * @memberof StyleX
     * @description: set the htmlelement position to the position of a Point
     * @ 设置网页对象的坐标到Point对象所对应的坐标
     */
    public static setItemToPoint( pt: Point ): Object{
        return this.setItemPosition( pt.x, pt.y );
    }

    /**
     * @static
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {*} 
     * @memberof StyleX
     * @description: set the htmlelement position and size
     * @ 设置网页元素的位置和大小
     */
    public static setItemRect( x: number, y: number, width: number, height: number ): Object{
        return { 'left': x + 'px', 'top': y + 'px', 'width': width + 'px', 'height': height + 'px' };
    }

    /**
     * @static
     * @param {Rectangle} rect
     * @memberof StyleX
     * @description: Set the position and size of the htmlelement according to a Rectangle
     * @ 根据一个Rectangle对象，来设置网页元素的位置和大小
     */
    public static setItemToRectangle( rect: Rectangle ): Object{
        return this.setItemRect( rect.x, rect.y, rect.width, rect.height );
    }

    /**
     * @static
     * @param {number} width
     * @param {number} height
     * @return {*} 
     * @memberof StyleX
     * @description: Set the size of the htmlelement
     * @ 设置网页元素的和大小
     */
    public static setSize( width: number, height: number ){
        return { 'width': width + 'px', 'height': height + 'px' };
    }

    /**
     * @static
     * @param {...Object[]} objs
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Combine the style Objects to one.
     * @ 将多个样式对象合并
     */
    public static combine( ...objs: any[] ): Object{
        let newObj: any = {};
        for( let i: number = 0; i < objs.length; i++ ){
            for( let ob in objs[i] ){
                newObj[ob] = objs[i][ob];
            }
        }
        return newObj;
    }
}
