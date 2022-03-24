export type ProductData = any;

export type VipData = { startTime: Date, endTime: Date, level: number }

export interface UserData { id: string, headimg: string, score: number, coins: number, play_tickets: number, is_vip: boolean, is_new: boolean,
    is_free: boolean, name: string, vipData: VipData | null, email: string }

export type UIData = { name: string, x: number, y: number }

export type TextData = { rect: any, color: number, size: number, font: string, align: string, stroke: number, strokeColor: number, bold?:boolean }

export type PopupVo = { art: string, type: string, products?: any[] }

export type GoodsData = { img: string, mac_addr: string, rd_url1: string, rd_url2: string, rtc_url1: string, rtc_url2: string, good_id: number,
    power: number, price: number, name: string, msg: string, mac_id: number, imgLoaded: boolean, isFree: string, isVIP: string }
  