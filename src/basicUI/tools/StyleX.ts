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
     * @param {boolean} setWidth
     * @param {boolean} setHeight
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Set the size of the htmlelement
     * @ 设置网页元素的和大小
     */
    public static setSize( width: number, height: number, setWidth: boolean = true, setHeight: boolean = true ): Object{
        let obj: any = {};
        if( setWidth ) obj.width = width + 'px';
        if( setHeight ) obj.height = height + 'px';
        return obj;
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

    /**
     * @static
     * @param {boolean} [horizontal=true]
     * @param {boolean} [vertical=true]
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: If fill the container
     * @ 是否撑满容器
     */
    public static fullSize( horizontal: boolean = true, vertical: boolean = true ): Object{
        let obj: any = {};
        if( horizontal ) obj.width = "100%";
        if( vertical ) obj.height = "100%";
        return obj;
    }

    /**
     * @static
     * @param {boolean} [center=true]
     * @param {boolean} [middle=true]
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: If position centered
     * @ 是否位置居中
     */
    public static center( center: boolean = true, middle: boolean = true ): Object{
        let obj: any = {};
        if( center ) obj.left = "50%";
        if( middle ) obj.top = "50%";
        return obj;
    }

    /**
     * @static
     * @param {number} sick
     * @param {(string | number)} color
     * @param {string} [style="solid"] value from: dotted solid double dashed; default: solid
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Set border
     * @ 设置边框
     */
    public static border( sick: number, color: string | number = 0, style: string = "solid" ): Object{
        if( !sick ) return { 'border': 'none' };
        if( typeof color == 'number' ) color = StringTransform.numberToColorString( color );
        return { 'border': `${sick}px ${style} ${color}` }
    }

    /**
     * @static
     * @param {number} hs horizontal-shadow
     * @param {number} vs vertical-shadow
     * @param {number} [blur=0]
     * @param {(string | number)} [color=0]
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Set text shadow
     * @ 设置文字阴影
     */
    public static textShadow( hs: number, vs: number, blur: number = 0, color: string | number = 0 ): Object{
        if( typeof color == 'number' ) color = StringTransform.numberToColorString( color );
        return {'text-shadow': `${hs}px ${vs}px ${blur}px ${color}`};
    }

    /**
     * @static
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Set cursor as hand
     * @ 光标显示为手
     */
    public static buttonMode(): Object{
        return {'cursor': 'pointer'};
    }

    /**
     * @static
     * @param isHorizontal
     * @return {*}  {Object}
     * @memberof StyleX
     * @description: Style for scrollBar
     * @ 带滚动条的列表的样式
     */
    public static scrollBar( isHorizontal: boolean = false ): Object{
        if( isHorizontal ) return {'overflow-x': 'scroll', 'overflow-y': 'hidden' };
        else return {'overflow-x': 'hidden','overflow-y': 'scroll' };
    }
}
