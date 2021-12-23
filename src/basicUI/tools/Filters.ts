import { StringTransform } from "./StringTransform";
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-22 14:06:26
 * @Description: to use filter, you need to declare variable in a component, and assign the filter item to this variable, then to use ngStyle with this variable.
 * @ 使用滤镜，首先要在组件里创建一个成员变量，把滤镜选项赋值给变量，然后在组件模板中，用ngStyle指令来指向该变量。
 * @example in component: "this.filters = Filters.multyFilter(Filters.saturate(0.7),Filters.blur(3),Filters.grayscale(0.7));", and in template: "<div [ngStyle]='filters'>"
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
            str += StringTransform.numberToColorString( color ) + ')';
        }
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Converts an image to a grayscale image. Value defines the scale of the conversion. If the value is 1, it will be completely converted to gray image, and if the value is 0, the image will not change. A value between 0 and 1 is the linear multiplier of the effect. If not set, the default value is 0.
     * @ 将图像转换为灰度图像。值定义转换的比例。值为1则完全转为灰度图像，值为0图像无变化。值在0到1之间，则是效果的线性乘子。若未设置，值默认是0。
     */
    public static grayscale( value: number = 0 ): Object{
        let str: string = 'grayscale(' + value + ')';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Apply hue rotation to the image. The "angle" value sets the color ring angle value that the image will be adjusted. If the value is 0deg, the image does not change. If the value is not set, the default value is 0deg. Although there is no maximum value, a value exceeding 360deg is equivalent to another circle.
     * @ 给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。值为0deg，则图像无变化。若值未设置，默认值是0deg。该值虽然没有最大值，超过360deg的值相当于又绕一圈。
     */
    public static hueRotate( deg: number = 0 ): Object{
        let str: string = 'hue-rotate(' + deg + 'deg)';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Inverts the input image. Value defines the scale of the conversion. If the value is 1, it will be completely reversed. If the value is 0, the image does not change. Values between 0 and 1 are linear multipliers of the effect. If the value is not set, the default value is 0.
     * @ 反转输入图像。值定义转换的比例。1的价值是完全反转。值为0则图像无变化。值在0和1之间，则是效果的线性乘子。 若值未设置，值默认是0。
     */
    public static invert( value: number = 0 ): Object{
        let str: string = 'invert(' + value + ')';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: The transparency of the converted image. Value defines the scale of the conversion. A value of 0 is completely transparent, and a value of 1 has no change in the image. If the value is between 0 and 1, it is the linear multiplier of the effect, which is also equivalent to multiplying the number of image samples. If the value is not set, the default value is 1.
     * @ 转化图像的透明程度。值定义转换的比例。值为0则是完全透明，值为1则图像无变化。值在0和1之间，则是效果的线性乘子，也相当于图像样本乘以数量。 若值未设置，值默认是1。
     */
    public static opacity( value: number = 1 ): Object{
        let str: string = 'opacity(' + value + ')';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Convert image saturation. Value defines the scale of the conversion. A value of 0 is completely unsaturated, and a value of 1 has no change in the image. Other values are linear multipliers of the effect. If a value greater than 1 is allowed, there is a higher saturation. If the value is not set, the default value is 1.
     * @ 转换图像饱和度。值定义转换的比例。值为0则是完全不饱和，值为1则图像无变化。其他值，则是效果的线性乘子。超过1的值是允许的，则有更高的饱和度。 若值未设置，值默认是1。
     */
    public static saturate( value: number = 1 ): Object{
        let str: string = 'saturate(' + value + ')';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filters
     * @Description: Converts the image to dark brown. Value defines the scale of the conversion. A value of 1 is completely dark brown, and a value of 0 does not change the image. A value between 0 and 1 is the linear multiplier of the effect. If not set, the default value is 0.
     * @ 将图像转换为深褐色。值定义转换的比例。值为1则完全是深褐色的，值为0图像无变化。值在0到1之间，则是效果的线性乘子。若未设置，值默认是0。
     */
    public static sepia( value: number = 0 ): Object{
        let str: string = 'sepia(' + value + ')';
        return { '-webkit-filter': str, 'filter': str };
    }

    /**
     * @static
     * @param {...any} filters filter items
     * @return {*} 
     * @memberof Filters
     * @Description: Provide filter array
     * @ 提供滤镜数组。
     */
    public static multyFilter( ...filters: any ): Object{
        let str: string = "";
        for( let i: number = 0; i < filters.length; i++ ){
            if( filters[i].filter ){
                str += filters[i].filter + " ";
            }
        }
        return { '-webkit-filter': str, 'filter': str };
    }
}
