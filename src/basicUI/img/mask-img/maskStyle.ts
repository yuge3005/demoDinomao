import { Point } from '../../geom/point';
/**
 * @param {string} url
 * @param {Point} [pt]
 * @return {*}  {string}
 * @description: Define mask
 * @ 定义遮罩
 */
export function maskStyle( url: string, pt?: Point ): string {
    let urlStr: string = "url(" + url + ")";
    let maskStyle: string = `
        mask-image: ${urlStr};
        -webkit-mask-image: ${urlStr};
    `
    if( pt ){
        let position: string = `-${pt.x}px -${pt.y}px`;
        maskStyle += `
            -webkit-mask-position: ${position};
            mask-position: ${position};
        `
    }
    return maskStyle;
}
