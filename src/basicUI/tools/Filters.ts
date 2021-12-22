/*
 * @Description: 
 * @version: 1.0
 * @Author: Wayne Yu
 * @Date: 2021-12-22 14:01:03
 * @LastEditors: Wayne Yu
 * @LastEditTime: 2021-12-22 14:28:13
 */
/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-22 14:06:26
 * @Description: to use filter, you need to declare variable in a component, and assign the filter item to this variable, then to use ngStyle with this variable.
 * @ 使用滤镜，首先要在组件里创建一个成员变量，把滤镜选项赋值给变量，然后在组件模板中，用ngStyle指令来指向该变量。
 * @example in component: "filter: Object = Filter.blur(5);", and in template: "<div [ngStyle]='filter'>"
 */
export class Filters {

    /**
     * @static
     * @param {number} value
     * @return {*}  {Object}
     * @memberof Filter
     * @Description: blur filter lets you apply a blur visual effect to display objects. A blur effect softens the details of an image. You can produce blurs that range from a softly unfocused look to a Gaussian blur, a hazy appearance like viewing an image through semi-opaque glass.
     * @ (模糊) 模糊滤镜将模糊视觉效果应用于显示对象。模糊效果可以柔化图像的细节。您可以生成一些模糊效果，范围从创建一个柔化的、未聚焦的外观到高斯模糊（就像通过半透明玻璃查看图像一样的朦胧的外观）。
     */
    public static blur( value: number ): Object{
        return { '-webkit-filter': 'blur(' + value +'px)', 'filter': 'blur(' + value + 'px)' };
    }
}
