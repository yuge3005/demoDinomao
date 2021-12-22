import { numberToColorString } from "./StringTransform";
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-22 14:06:26
 * @Description: to use filter, you need to declare variable in a component, and assign the filter item to this variable, then to use ngStyle with this variable.
 * @ 使用滤镜，首先要在组件里创建一个成员变量，把滤镜选项赋值给变量，然后在组件模板中，用ngStyle指令来指向该变量。
 * @example in component: "filter: Object = Filters.blur(5);", and in template: "<div [ngStyle]='filter'>"
 */
export class Filters {

    /**
     * @static
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: no filter
     * @ 无滤镜效果
     */
    public static none(): Object{
        return {};
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filter
     * @Description: blur filter lets you apply a blur visual effect to display objects. A blur effect softens the details of an image. You can produce blurs that range from a softly unfocused look to a Gaussian blur, a hazy appearance like viewing an image through semi-opaque glass.
     * @ 模糊滤镜将模糊视觉效果应用于显示对象。模糊效果可以柔化图像的细节。您可以生成一些模糊效果，范围从创建一个柔化的、未聚焦的外观到高斯模糊（就像通过半透明玻璃查看图像一样的朦胧的外观）。
     */
    public static blur( value: number = 2 ): Object{
        let str: string = 'blur(' + value +'px)';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Apply a linear multiplication to the picture to make it look brighter or darker. If the value is 0, the image is completely black. If the value is 1, the image does not change. Other values correspond to the linear multiplier effect. If the value exceeds 1, the image will be brighter than the original. If there is no set value, the default value is 1.
     * @ 给图片应用一种线性乘法，使其看起来更亮或更暗。如果值是0，图像会全黑。值是1，则图像无变化。其他的值对应线性乘数效果。值超过1也是可以的，图像会比原来更亮。如果没有设定值，默认是1。
     */
    public static brightness( value: number = 1 ): Object{
        let str: string = 'brightness(' + value + ')';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Adjust the contrast of the image. If the value is 0, the image will be completely black. If the value is 1, the image does not change. The value can exceed 1, which means that a lower contrast will be used. If no value is set, the default value is 1.
     * @ 调整图像的对比度。值是0的话，图像会全黑。值是1，图像不变。值可以超过1，意味着会运用更低的对比。若没有设置值，默认是1。
     */
    public static contrast( value: number = 1 ): Object{
        let str: string = 'contrast(' + value + ')';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} disX distence x
     * @param {number} disY distence y
     * @param {number} [blur=2] blur
     * @param {(number | string)} [color=0] can be hexadecimal number as 0xFFFFFF, or a string represents the color
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Set a shadow effect on the image. The shadow is an offset version of the mask that can be drawn in a specific color.
     * @ 给图像设置一个阴影效果。阴影是合成在图像下面，可以有模糊度的，可以以特定颜色画出的遮罩图的偏移版本。
     */
    public static dropShadow( disX: number, disY: number, blur: number = 2, color: number | string = 0 ): Object{
        let str: string = 'drop-shadow(' + disX + 'px ';
        str += disY + 'px ';
        str += blur + 'px ';
        if( typeof(color) == "string" ){
            str += color + ')';
        }
        else if( typeof(color) == "number" ){
            str += numberToColorString( color ) + ')';
        }
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Converts an image to a grayscale image. Value defines the scale of the conversion. If the value is 1, it will be completely converted to gray image, and if the value is 0, the image will not change. A value between 0 and 1 is the linear multiplier of the effect. If not set, the default value is 0.
     * @ 将图像转换为灰度图像。值定义转换的比例。值为1则完全转为灰度图像，值为0图像无变化。值在0到1之间，则是效果的线性乘子。若未设置，值默认是0.
     */
    public static grayscale( value: number = 0 ): Object{
        let str: string = 'grayscale(' + value + ')';
        return { '-webkit-filter': str, 'filter': str };
    }
}
