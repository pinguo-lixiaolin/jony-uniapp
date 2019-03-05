/**
 * 水印处理模块
 */

import { Base64 } from './Base64'
import { NetworkConfig } from '../Config'

export const WatermarkWrap = {
    width: 750,
    height: 500
}

export const Gravitys = ["NorthWest", "North", "NorthEast", "West", "Center", "East", "SouthWest", "South", "SouthEast"]

interface Coordinates {
    x: number
    y: number
}

interface AnchorInterface extends Coordinates {
    gravity: string
    index: number
}

let _anchorParams = new Array()
for (let index = 0; index < Gravitys.length; index++) {
    const _gravity = {
        x: (index%3)*(WatermarkWrap.width/2),
        y: (Math.floor(index/3))*(WatermarkWrap.height/2),
        gravity: Gravitys[index]
    }
    _anchorParams.push(_gravity)
}

export const AnchorParams = _anchorParams

export interface WmInfoInit {
    wmPic: string
    etag: string
    wmWidth: number
    wmHeight: number
    wmRatio: number
    gravity?: string
    dissolve?: number
    vws?: number
    aws?: number
    dxr: number
    dyr: number
    zIndex: number
}

export interface WmInfoInterface extends WmInfoInit {
    id: string
    wmRatioWidth: number
    wmRatioHeight: number
    x: number
    y: number
    vws: number
    aws: number
}

export interface WmInfoGInterface extends WmInfoInterface {
    gravity: string
}

export class WmInfo {
    constructor(info: WmInfoInit, isHistory: boolean, index: number) {

        const wmCtrlWitdh = WatermarkWrap.width,
            wmCtrlHeight = WatermarkWrap.height

        this.zIndex = info.zIndex || index || 0
        this.id = info.etag+(isHistory?'_his_':'_new_')+index
        this.wmPic = info.wmPic || NetworkConfig.ImageHost + info.etag
        this.etag = info.etag || ''
        this.dissolve = info.dissolve || 100
        this.wmRatio = info.wmRatio || 1.5
        this.gravity = info.gravity || ''
        this.vws = info.vws || 0.15
        this.aws = info.aws || 0.15
        this.dxr = (info.dxr >= -5) ? info.dxr : 2
        this.dyr = (info.dyr >= -5) ? info.dyr : 2
        this.wmHeight = this.wmRatioHeight = wmCtrlHeight * this.aws
        this.wmWidth = this.wmRatioWidth = this.wmRatioHeight * (this.wmRatio || 0)

        if (this.wmWidth > wmCtrlWitdh) {
            this.wmWidth = this.wmRatioWidth = wmCtrlWitdh
            this.wmHeight = this.wmRatioHeight = this.wmWidth / (this.wmRatio || 1)
        }

        if (this.wmHeight > wmCtrlHeight) {
            this.wmHeight = this.wmRatioHeight = wmCtrlHeight
            this.wmWidth = this.wmRatioWidth = this.wmHeight * (this.wmRatio || 1)
        }

        let wmXY = new Watermark().getXYByGravity(this)
        this.x = wmXY.x
        this.y = wmXY.y
    }

    id = ''
    zIndex = 0
    wmPic = ''
    etag = ''
    dissolve = 100
    wmWidth = 0
    wmHeight = 0
    wmRatioWidth = 0
    wmRatioHeight = 0
    wmRatio = 1.5
    gravity = ''
    dxr = 2
    dyr = 2
    x = 0
    y = 0
    vws = 0.15
    aws = 0.15
}

interface PicInterface {
    width: number
    height: number
}

export class Watermark {
    private static _instance: Watermark|null = null;
    
    static get sharedInstance(): Watermark  {
        if (Watermark._instance == null) {
            Watermark._instance = new Watermark();
        }
        return Watermark._instance;
    }

    checkWmIdExsit(wmList: any[], wmInfo: { wm: WmInfoInterface, index: number, isHistory: boolean}) {
        let currWmIndex = 0
        wmList.forEach((wmItem: WmInfoInterface, index: number) => {
            if (wmItem.id == (wmInfo.wm.etag+(wmInfo.isHistory?'_his_':'_new_')+wmInfo.index)) {
                currWmIndex = index
            }
        })
        return currWmIndex
    }

    formatWm(wmInfo: WmInfoInterface) {
        let wmAnchor = this.wmAnchor(wmInfo)
        let wmDxDy = this.wmDxDy(wmInfo, wmAnchor)
        // console.log(wmAnchor.gravity, wmDxDy)
        let wmWidth = parseFloat(wmInfo.wmWidth+''),
            wmHeight = parseFloat(wmInfo.wmHeight+''),
            aws = wmHeight / WatermarkWrap.height,
            vws = aws * wmInfo.wmRatio
        return {
            gravity: wmAnchor.gravity,
            etag: wmInfo.etag,
            dissolve: wmInfo.dissolve,
            wmWidth: wmWidth,
            wmHeight: wmHeight,
            wmRatioWidth: wmInfo.wmRatioWidth,
            wmRatioHeight: wmInfo.wmRatioHeight,
            wmRatio: wmInfo.wmRatio,
            dxr: wmDxDy.dxr,
            dyr: wmDxDy.dyr,
            vws: vws,
            aws: aws
        }
    }

    wmReference(wmInfo: WmInfoInterface, index: number):Coordinates {
        return {
            x: wmInfo.x + (parseFloat(wmInfo.wmWidth+'')/2)*(index%3),
            y: wmInfo.y + (parseFloat(wmInfo.wmHeight+'')/2)*(Math.floor(index/3)),
        }
    }

    wmAnchor(wmInfo: WmInfoInterface):AnchorInterface {
        let lastHypotenuse = Math.pow(WatermarkWrap.height, 2) + Math.pow(WatermarkWrap.width, 2),
            lastAnchor = AnchorParams[0]
        for (let index = 0; index < AnchorParams.length; index++) {
            const anchor = AnchorParams[index],
                wmReference = this.wmReference(wmInfo, index)
            // console.log(wmReference, anchor)
            // console.log(Math.pow(anchor.x - wmReference.x, 2),Math.pow(anchor.y - wmReference.y, 2))
            const anchorLength = Math.pow(anchor.x - wmReference.x, 2)+Math.pow(anchor.y - wmReference.y, 2)
            // console.log(anchorLength)
            if (anchorLength <= lastHypotenuse) {
                lastHypotenuse = anchorLength
                lastAnchor = anchor
                lastAnchor.index = index
            }
        }
        // console.log(lastHypotenuse, lastAnchor)
        return lastAnchor
    }

    wmDxDy(wmInfo: WmInfoInterface, wmAnchor: AnchorInterface) {
        let dxdy:Coordinates = { x: 0, y: 0 },
            wmXY:Coordinates = this.wmReference(wmInfo, wmAnchor.index)

        dxdy.x = wmXY.x - wmAnchor.x || 0
        dxdy.y = wmXY.y - wmAnchor.y || 0
        if (wmAnchor.index%3 == 2) {
            dxdy.x = wmAnchor.x - wmXY.x
        }
        if (Math.floor(wmAnchor.index/3) == 2) {
            dxdy.y = wmAnchor.y - wmXY.y
        }
        return {
            dxr: (dxdy.x/WatermarkWrap.width*100).toFixed(2),
            dyr: (dxdy.y/WatermarkWrap.height*100).toFixed(2)
        }
    }

    getXYByGravity(wmInfo: WmInfoGInterface):Coordinates {
        if (wmInfo.gravity) {
            let anchorIndex = 8
            Gravitys.forEach((gravity, index) => {
                if (gravity == wmInfo.gravity) {
                    anchorIndex = index
                }
            })
            // console.log(wmInfo)
            let anchor = {
                x: parseFloat(WatermarkWrap.width+'')/2*(anchorIndex%3),
                y: parseFloat(WatermarkWrap.height+'')/2*Math.floor(anchorIndex/3)
            }
            let wmRef = this.wmReference(wmInfo, anchorIndex)

            let x = anchor.x - wmRef.x + wmInfo.dxr/100*WatermarkWrap.width,
                y = anchor.y - wmRef.y + wmInfo.dyr/100*WatermarkWrap.height

            if (anchorIndex%3 == 2) {
                x = anchor.x - wmRef.x - wmInfo.dxr/100*WatermarkWrap.width
            }
            if (Math.floor(anchorIndex/3) == 2) {
                y = anchor.y - wmRef.y - wmInfo.dyr/100*WatermarkWrap.height
            }
            // console.log(x, y)
            return { x, y }
        } else {
            return {
                x: WatermarkWrap.width * (100 - wmInfo.dxr) / 100 - wmInfo.wmWidth,
                y: WatermarkWrap.height * (100 - wmInfo.dyr) / 100 - wmInfo.wmHeight
            }
        }
    }

    getWaterMarkUrl(pic: PicInterface, watermarkStr: string, sizeType: string):string {

        let wmList = JSON.parse(watermarkStr)

        let wmUrl = ''

        if (wmList.length > 0) {
            wmUrl = 'watermark/3'
        }

        for (let index = 0; index < wmList.length; index++) {

            let _wmItem = wmList[index]

            if (_wmItem.etag) {
                let image = Base64.encode(`${NetworkConfig.ImageHost+_wmItem.etag}?imageslim`).replace(/\+/g, "-").replace(/\//g, "_")
                let baseUrl = `/image/${image}/dissolve/${_wmItem.dissolve}/gravity/${_wmItem.gravity}`

                let ratio = pic.width / pic.height

                let size:any
                if (_wmItem.dxr >= -100) {
                    if (ratio > 1) {
                        if (sizeType=="original") {
                            size = pic.width
                        } else {
                            if (Number(sizeType) > pic.width) {
                                size = pic.width
                            } else {
                                size = sizeType
                            }
                        }
                        baseUrl += `/dx/${parseInt(_wmItem.dxr/100*size+'')}/dy/${parseInt(_wmItem.dyr/100*size/ratio+'')}`
                    } else {
                        if (sizeType=="original") {
                            size =  pic.height
                        } else {
                            if (Number(sizeType) > pic.height) {
                                size =  pic.height
                            } else {
                                size = sizeType
                            }
                        }
                        baseUrl += `/dx/${parseInt(_wmItem.dxr/100*size*ratio+'')}/dy/${parseInt(_wmItem.dyr/100*size+'')}`
                    }
                } else {
                    baseUrl += `/dx/${_wmItem.dx}/dy/${_wmItem.dy}`
                }

                if (ratio >= 1) {
                    let aws = _wmItem.aws*(ratio/3*2)
                    if (aws > 1) {
                        aws = 1
                    }
                    baseUrl += `/ws/${_wmItem.aws}`
                    // baseUrl += '/ws/'+aws
                } else {
                    if (_wmItem.vws > 1) {
                        _wmItem.vws = 1
                    }
                    baseUrl += `/ws/${_wmItem.vws}`
                }

                wmUrl += baseUrl
            }
        }

        return wmUrl
    }

    checkWmValidation(watermarkStr: string) {
        try {
            if (watermarkStr && watermarkStr != 'undefined' && watermarkStr != 'null' && watermarkStr != '[]') {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export const WatermarkInstance = Watermark.sharedInstance;