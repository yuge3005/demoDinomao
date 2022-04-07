export type ProductData = any;

export type VipData = { startTime: Date, endTime: Date, level: number }

export type UserData = { id: string, headimg: string, score: number, coins: number, play_tickets: number, is_vip: boolean, is_new: boolean,
    is_free: boolean, name: string, vipData: VipData | null, email: string, hasClub: boolean }

export type UIData = { name: string, x: number, y: number }

export type TextData = { rect: any, color: number, size: number, font: string, align: string, stroke: number, strokeColor: number, bold?:boolean }

export type PopupVo = { art: string, type: string, products?: any[] }

export type GoodsData = { img: string, mac_addr: string, rd_url1: string, rd_url2: string, rtc_url1: string, rtc_url2: string, good_id: number,
    power: number, price: number, name: string, msg: string, mac_id: number, imgLoaded: boolean, isFree: string, isVIP: string }

export type FeatureVo = { art: string, behaviour?: string, featured?: string }

export type ExternalData = { type: string, id: string, name: string, art: any[], triggers: any, products: ProductData[], feature_id: string }

export type CategoryData = { class_img: string, name: string, level: string, score_class_id: string, state: string, time: string }

export type AddressData = { addr: string, addr_id: string, address: string, city: string, country: string, district: string, email: string,
    first_name: string, last_name: string, postal: string, province: string, state: string, tel: string, user_id: string }
