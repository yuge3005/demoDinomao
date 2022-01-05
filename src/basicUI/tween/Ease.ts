/**
 * @version: 1.0
 * @Author: Wayne Yu
 * @LastEditTime: 2021-12-28 13:29:04
 * @description: Enumerate the easing mode
 * @ 枚举缓动模式
 * @default: Ease.RegularEaseOut
 */
export class Ease {

    /**
     * @type {string}
     * @memberof Ease
     * @description: linear
     * @ 线性
     */
    public static Linear: string = "linear";

    /**
     * @type {string}
     * @memberof Ease
     * @description: ease out
     * @ 渐缓
     */
    public static RegularEaseOut: string = "";

    /**
     * @type {string}
     * @memberof Ease
     * @description: ease in with ejection starts
     * @ 渐快，弹射起步
     */
    public static BackEaseIn: string = "BackEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: ease out with rebound
     * @ 渐缓，带回弹
     */
    public static BackEaseOut: string = "BackEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: ease in with ejection starts, and ease out with rebound
     * @ 弹射起步加回弹
     */
    public static BackEaseInOut: string = "BackEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: ease in with ejection starts many times
     * @ 渐快，多次弹射起步
     */
    public static BounceEaseIn: string = "BounceEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: ease out with ejection starts many times
     * @ 渐缓，多次弹射起步
     */
    public static BounceEaseOut: string = "BounceEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: ease in with ejection starts many times, and ease out with rebound
     * @ 多次弹射起步，带回弹
     */
    public static BounceEaseInOut: string = "BounceEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: start slowly then stop suddenly
     * @ 慢速起步后瞬停
     */
    public static CircEaseIn: string = "CircEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: start fast then ease in
     * @ 快速起步后渐缓
     */
    public static CircEaseOut: string = "CircEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: start and stop slowly, move fast
     * @ 启停慢，移动快
     */
    public static CircEaseInOut: string = "CircEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Cubic curve, ease in
     * @ 三次曲线，渐快
     */
    public static CubicEaseIn: string = "CubicEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Cubic curve, ease out
     * @ 三次曲线，渐缓
     */
    public static CubicEaseOut: string = "CubicEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Cubic curve, start and stop slowly, move fast
     * @ 三次曲线，启停慢，移动快
     */
    public static CubicEaseInOut: string = "CubicEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Elastic ease in
     * @ 多次回弹，渐快
     */
    public static ElasticEaseIn: string = "ElasticEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Elastic ease out
     * @ 多次回弹，渐缓
     */
    public static ElasticEaseOut: string = "ElasticEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description:
     * @ 多次回弹，起步和停止
     */
    public static ElasticEaseInOut: string = "ElasticEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: ease in，stop abruptly
     * @ 渐快，突然停
     */
    public static ExpoEaseIn: string = "ExpoEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: start abruptly and ease out
     * @ 爆炸起步，渐缓
     */
    public static ExpoEaseOut: string = "ExpoEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: start and stop slowly, move fast
     * @ 爆炸式，启停慢，移动快
     */
    public static ExpoEaseInOut: string = "ExpoEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quad ease in
     * @ 平稳渐快
     */
    public static QuadEaseIn: string = "QuadEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quad ease out
     * @ 平稳渐缓
     */
    public static QuadEaseOut: string = "QuadEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quad ease in and ease out
     * @ 平稳起停和移动
     */
    public static QuadEaseInOut: string = "QuadEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quartic curve, ease in
     * @ 四次曲线，渐快
     */
    public static QuartEaseIn: string = "QuartEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quartic curve, ease out
     * @ 四次曲线，渐慢
     */
    public static QuartEaseOut: string = "QuartEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quartic curve, start and stop slowly, move fast
     * @ 四次曲线，启停慢，移动快
     */
    public static QuartEaseInOut: string = "QuartEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quintic curve, ease in
     * @ 五次曲线，渐快
     */
    public static QuintEaseIn: string = "QuintEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quintic curve, ease out
     * @ 五次曲线，渐慢
     */
    public static QuintEaseOut: string = "QuintEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: Quintic curve, start and stop slowly, move fast
     * @ 五次曲线，启停慢，移动快
     */
    public static QuintEaseInOut: string = "QuintEaseInOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: sine ease in
     * @ 正弦，渐快
     */
    public static SineEaseIn: string = "SineEaseIn";

    /**
     * @type {string}
     * @memberof Ease
     * @description: sine ease out
     * @ 正弦，渐慢
     */
    public static SineEaseOut: string = "SineEaseOut";

    /**
     * @type {string}
     * @memberof Ease
     * @description: sine, start and stop slowly, move fast
     * @ 正弦，启停慢，移动快
     */
    public static SineEaseInOut: string = "SineEaseInOut";
}
