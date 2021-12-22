/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-21 15:51:21
 * @discription to use blend mode, you need to declare variable in a component, and assign the blend mode item to this variable, then to use ngStyle with this variable.
 * @ 使用混合模式，首先要在组件里创建一个成员变量，把混合模式选项赋值给变量，然后在组件模板中，用ngStyle指令来指向该变量。
 * @example in component: "blendMode: Object = BlendMode.MULTIPLY;", and in template: "<div [ngStyle]='blendMode'>"
 */
export class BlendMode {
    
    /**
     * @readonly
     * @memberof BlendMode
     * @discription The display object appears in front of the background.
     * @ (正常)该显示对象出现在背景前面。
     */
    public static get NORMAL(): Object{
        return {'mix-blend-mode': 'normal'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription Multiplies the values of the display object constituent colors by the constituent colors of the background color, and normalizes by dividing by 0xFF, resulting in darker colors.
     * @ (正片叠底)将显示对象的原色值与背景颜色的原色值相乘，然后除以 0xFF 进行标准化，从而得到较暗的颜色。
     */
    public static get MULTIPLY(): Object{
        return {'mix-blend-mode': 'multiply'};
    }
    
    /**
     * @readonly
     * @memberof BlendMode
     * @discription Multiplies the complement (inverse) of the display object color by the complement of the background color, resulting in a bleaching effect.
     * @ (滤色)将显示对象颜色的补色（反色）与背景颜色的补色相乘，会产生漂白效果。
     */
    public static get SCREEN(): Object{
        return {'mix-blend-mode': 'screen'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription Adjusts the color of each pixel based on the darkness of the background.
     * @ (叠加)根据背景的暗度调整每个像素的颜色。
     */
    public static get OVERLAY(): Object{
        return {'mix-blend-mode': 'overlay'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription Selects the darker of the constituent colors of the display object and the colors of the background (the colors with the smaller values).
     * @ (变暗)在显示对象原色和背景颜色中选择相对较暗的颜色（具有较小值的颜色）。
     */
    public static get DARKEN(): Object{
        return {'mix-blend-mode': 'darken'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription Selects the lighter of the constituent colors of the display object and the colors of the background (the colors with the larger values).
     * @ (变亮)在显示对象原色和背景颜色中选择相对较亮的颜色（具有较大值的颜色）。
     */
    public static get LIGHTEN(): Object{
        return {'mix-blend-mode': 'lighten'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription Compares the constituent colors of the display object with the colors of its background, and subtracts the darker of the values of the two constituent colors from the lighter value.
     * @ (差值)将显示对象的原色与背景颜色进行比较，然后从较亮的原色值中减去较暗的原色值。
     */
    public static get DIFFERENCE(): Object{
        return {'mix-blend-mode': 'difference'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription color dodge, Adds the values of the constituent colors of the display object to the colors of its background, applying a ceiling of 0xFF.
     * @ (颜色减淡)将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。
     */
    public static get COLOR_DODGE(): Object{
        return {'mix-blend-mode': 'color-dodge'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription color burn
     * @ (颜色加深)
     */
    public static get COLOR_BURN(): Object{
        return {'mix-blend-mode': 'color-burn'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription hard light, Adjusts the color of each pixel based on the darkness of the display object.
     * @ (强光)根据显示对象的暗度调整每个像素的颜色。
     */
    public static get HARDLIGHT(): Object{
        return {'mix-blend-mode': 'hard-light'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription soft light
     * @ (柔光)
     */
    public static get SOFTLIGHT(): Object{
        return {'mix-blend-mode': 'soft-light'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription exclusion
     * @ (排除)
     */
    public static get EXCLUSION(): Object{
        return {'mix-blend-mode': 'exclusion'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription hue
     * @ (色相)
     */
    public static get HUE(): Object{
        return {'mix-blend-mode': 'hue'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription saturation
     * @ (饱和度)
     */
    public static get SATURATION(): Object{
        return {'mix-blend-mode': 'saturation'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription color
     * @ (颜色)
     */
    public static get COLOR(): Object{
        return {'mix-blend-mode': 'color'};
    }

    /**
     * @readonly
     * @memberof BlendMode
     * @discription luminosity
     * @ (明度)
     */
    public static get LUMINOSITY(): Object{
        return {'mix-blend-mode': 'luminosity'};
    }
}
