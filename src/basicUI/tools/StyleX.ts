import { StringTransform } from './StringTransform';
import { Rectangle } from '../geom/rectangle';
import { Point } from '../geom/point';
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-30 09:44:07
 * @description: CSS style for some special feature.
 * @ 提供特殊用途的css。
 * @example in component: "this.myCss = StyleX.combine( StyleX.borderRadius(15), StyleX.setItemRect( 15, 20, 50, 100 ) );", and in template: "<div [ngStyle]='myCss'>"
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
     * @return {*}  {Object}
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
     * @return {*}  {Object}
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
     * @return {*}  {Object}
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
     * @return {*}  {Object}
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
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Set the size of the htmlelement
     * @ 设置网页元素的和大小
     */
    public static setSize( width: number, height: number ): Object{
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

    /**
     * @static
     * @param {number} anchorOffsetX
     * @param {number} anchorOffsetY
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Sets the anchor of the object
     * @ 设置对象的锚点
     */
    public static anchorOffset( anchorOffsetX: number, anchorOffsetY: number ): Object{
        return { 'margin-left': -anchorOffsetX + 'px', 'margin-top': -anchorOffsetY + 'px' };
    }

    /**
     * @static
     * @param {number} sick
     * @param {number} color
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Set text stroke
     * @ 设置字体描边
     */
    public static textStroke( sick: number, color: number ): Object{
        let colorStr: string = StringTransform.numberToColorString( color );
        let str: string = sick + 'px ' + colorStr;
        return { 'text-stroke': str, '-webkit-text-stroke': str, '-moz-text-stroke': str, '-ms-text-stroke': str };
    }

    /**
     * @static
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: None select, mouse and touch events will ignore the object
     * @ 无法选中，鼠标及触摸事件将穿透物体。
     */
    public static noneSelect(): Object{
        let str: string = 'none';
        return { '-webkit-user-select': str, '-moz-user-select': str, 'user-select': str, 'pointer-events': str };
    }

    /**
     * @static
     * @param {string} url
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Background stretch full screen
     * @ 背景拉伸撑满
     */
    public static stretchingBg( url: string ): Object{
        return { 'background-repeat': 'no-repeat', 'background-size': '100% 100%', 'background-image': 'url(' + url + ')' };
    }

    /**
     * @static
     * @param {(string | number)} color
     * @param {number} [opacity=1] 
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Set background color and opacity, default opacity is 1.
     * @ 设置背景颜色和不透明度,默认不透明。
     * @notes if the value of opacity between 0 and 1, color must be a number
     */
    public static backgroundColor( color: string | number, opacity: number = 1 ): Object{
        if( opacity >= 1 ){
            if( typeof color == 'number' ) color = StringTransform.numberToColorString( color );
            return { 'background-color': color };
        }
        else if( opacity <= 0 ){
            return { 'background-color': 'transparent' };
        }
        else{
            if( typeof color != 'number' ){
                console.error( "if the value of opacity between 0 and 1, color must be a number" );
                return {};
            }
            let r: number = ( color >> 16 ) & 0xFF;
            let g: number = ( color >> 8 ) & 0xFF;
            let b: number = color & 0xFF;
            return { 'background-color': `rgba(${r}, ${g}, ${b}, ${opacity})` };
        }
    }
}
