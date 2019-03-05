/**
 * @author: majianguang
 * @Date 2018-01-11
 * 一些配置项，固定不会改变的东西，可以写在这里
 */

/* 网络相关的配置 */
export namespace NetworkConfig {

    export const VERSION: string = "2.3.0"

    /// 三个状态，优先级RELEASE > QA > DEBUG
    export enum NetworkType {
        Debug = 'Debug',
        Qa = 'Qa',
        Release = 'Release'
    }

    // 配置服务器域名的NetworkHost
    export const ENV: NetworkType = NetworkType.Debug;

    export enum NetworkHost {
        Debug = "https://kanny-api-dev.camera360.com",
        Qa = "https://kanny-api-qa.camera360.com",
        Release = "https://kanny-api.camera360.com"
    }

    export enum RequestMethod {
        GET = "GET",
        OPTIONS = "OPTIONS",
        HEAD = "HEAD",
        POST = "POST",
        PUT = "PUT",
        DELETE = "DELETE",
        TRACE = "TRACE",
        CONNECT = "CONNECT"
    }

    export const RequestHeader = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    export const UploadFileName = "Filedata"

    export const ImageHost = "https://c360-o2o.c360dn.com/"
}

// 请求接口接口相关配置
export namespace InterfaceConfig {
    export enum OrderInterfaceConfig {
        // tmp
        getTempTypeList = "/applet/type/list",
        getTempList = "/applet/tmp/list",
        updateTmp = "/applet/photo/add-order-photo",
        updateBanner = "/applet/tmp/update-tmp",
        // tag
        getTagList = "/applet/order/get-tag-list",
        getTagListV2 = "/applet/v2/order/get-tag-list",
        createTag = "/applet/tag/create-tag",
        deleteTag = "/applet/tag/delete-tag",
        updateTag = "/applet/tag/update-tag",
        // order
        orderEndShoting = "/applet/order/update",
        getWaterMarkHistory = "/applet/order/water-mark-history",
        orderList = "/applet/order/list",
        createOrder = "/applet/order/create",
        cancelOrder = "/applet/order/cancel",
        reviseOrder = "/applet/order/revise",
        getLoadingPic = "/applet/order/get-load",
        addLoadingPic = "/applet/order/set-load-img",
        // modify
        saveOrderBaseInfo = "/applet/order/update-order-act",
        saveOrderPlace = "/applet/order/update-order",
        saveOrderWaterMark = "/applet/order/update-order-non",
        saveOrderRawControl = "/applet/order/update-order",
        saveOrderBrandControl = "/applet/order/update-order-non",
        saveOrderLoadingPic = "/applet/order/update-order-act",
        saveOrderShareInfo = "/applet/order/add-share-info",
        saveActivityDetail = "/applet/order/update-order-act",
        // photo
        getUploadAuth = "/applet/photo/upload-auth",
        getPhotos = "/applet/photo/get-photos",
        addReply = "/applet/photo/update-relay",
        addOrderPhoto = "/applet/photo/add-order-photo",
        deletePhoto = "/applet/photo/delete",
        searchLocation = "/applet/photo/get-poi",
        initLocationPois = "/applet/photo/get-poi",
        getZipStatus = "/applet/v2/photo/get-zip-status",
        originalPackZip = "/applet/v2/photo/original-pack-zip",
        watermarkPackZip = "/applet/v2/photo/watermark-pack-zip",
        // personnel
        getAccountList = "/applet/info/my-account",
        searchUser = "/applet/order/search-user",
        historyUser = "/applet/order/user-list",
        // pg
        getPgHistory = "/applet/order/user-list",
        getUserPgList = "/applet/pg/list",
        addUserPg = "/applet/pg/add",
        deleteUserPg = "/applet/pg/delete",
        // fix
        getFixhistory = "/applet/order/order-fix-list",
        getUserFixList = "/applet/fix/list",
        addUserFix = "/applet/fix/add",
        deleteUserFix = "/applet/fix/delete",
        // coor
        getUserCoorList = "/applet/coor/list",
        addUserCoor = "/applet/coor/add",
        deleteUserCoor = "/applet/coor/delete",
        // order personnel
        addOrderUser = "/applet/order/add-order-user",
        delOrderUser = "/applet/order/del-order-user",
        addOrderFix = "/applet/order/add-order-fix",
        delOrderFix = "/applet/order/del-order-fix",
        // 分享图记录
        shareImgList ="/applet/share-img/list",  //   获取用户收藏分享图   token
        shareImgAdd ="/applet/share-img/add",  //  添加用户收藏分享图  token eTag
        shareImgDelete ="/applet/share-img/delete",  //  添加用户收藏分享图  token shareId
        // 加载图记录
        loadingImgList = "/applet/loading-img/list",     // 获取用户收藏加载图列表  token
        loadingImgAdd = "/applet/loading-img/add",   // 添加用户收藏加载图  token  eTag
        loadingImgDelete = "/applet/loading-img/delete",     // 删除用户收藏加载图  token  loadId
        // 控制开关
        setCameraMan = "/applet/order/set-camera-man",       //		orderId	status 0 关闭 1开启  设置相册是否显示摄影师信息
        setFixMan = "/applet/order/set-fix-man",	        //        orderId	status 0 关闭 1开启 设置相册是否显示修图师信息
        setCreator = "/applet/order/set-creator",        //	      orderId	status 0 关闭 1开启 设置相册是否显示创建者信息
        setReward = "/applet/order/SetReward",
        setImgShow = "/applet/order/set-show-img",        //	      orderIdstatus  OPEN 开启  CLOSE 关闭 设置相册是否显示封面
        setPwd = "/applet/order/set-pwd",                //  orderId pwd 设置相册密码
        // 预约设置
        setReserve = "/applet/order/update-order-setting",
        getReserve = "/applet/order/get-order-setting",
        reserveCtrl = "/applet/order/order-setting-control",
        // 官网公众号设置
        setWebSite = "/applet/order/set-web-site",
        getWebSite = "/applet/order/get-web-site",
        // 添加相册视频信息
        getVideoInfo = "/applet/order/get-video-info",
        addVideo = "/applet/order/add-video",
        updateVideo = "/applet/order/update-video",
        deleteVideo = "/applet/order/delete-video",
        getVideo = "/applet/order/get-video",
        // 皮肤设置
        getSkin = "/applet/order/get-skin",
        setSkin = "/applet/order/set-skin",
        // 嘉宾设置
        setGuest = "/applet/order/set-order-guest",
        deleteGuest = "/applet/order/delete-order-guest",
        updateGuest = "/applet/order/update-order-guest",
        // 获取嘉宾组织者列表
        getOrgGuestList = "/applet/order/get-order-guest-organizer",
        // 设置组织者
        setOrganizer = "/applet/order/set-order-organizer",
        updateOrganizer = "/applet/order/update-order-organizer",
        deleteOrganizer = "/applet/order/delete-order-organizer",
        // 设置底部品牌展示
        setBrand = "/applet/v2/order/setBrand",
    }

    export enum UserInterfaceConfig {
        login = "/applet/user/login",
        userRegister = "/client/user/register",
        checkCode = "/client/user/check-code",
        checkPsw = "/client/user/pwd-login",
        initPsw ="/client/user/Initialize-pwd",
        changePsw = "/client/user/change-pwd",
        sendCodes = "/applet/user/send-codes",
        binding = "/applet/info/binding",
        updateUser = "/applet/info/update-user",
        changeAccount = "/applet/info/change-account",
        getUserInfo = "/applet/info/get-user-info",
        // 获取拍摄场次信息
        getCensus = "/applet/user/get-census",
        addImage = "/applet/info/add-image",
        getShotList = "/applet/shot/list",   // 获取用户拍摄类型列表
        addShot = "/applet/shot/add",  // 添加摄影师拍摄类型  uid id 拍摄类型ID
        deleteShot = "/applet/shot/delete",  // 删除摄影师拍摄类型  uid  id
        getUserCase = "/applet/info/get-user-case",  // 获取用户案例列表  uid  page limit
        updateUserCase = "/applet/info/update-user-case",  // 添加删除 用户案例  uid  orderId type 0 删除 1 增加
        getImages = "/applet/info/get-works",
        updateImage = "/applet/info/update-image",
        deleteImage = "/applet/info/delete-image",
        addPhone = "/applet/photo/add-photo",
        getBespeakList = "/applet/user/getBespeakPage", //获取预约列表
        setBespeakStatus = "/applet/user/setBespeakStatus", //设置预约状态
    }
    export enum StatisticsInterfaceConfig {
        index = "/applet/bigData/index"
    }
    export enum OtherInterfaceConfig {
        createUnlimitWxQrCode = "/applet/create/wx-a-code-un-limit",
        // 生成短链接
        createUrl = "/applet/order/create-url",
        // ad
        getAdList = "/applet/ad/get-list"
    }
    export enum CashInterfaceConfig{
        companyBind = "/applet/company-pay/index",
        createCash = "/applet/company-pay/create",
        payCash = "/applet/company-pay/pay",
        getUserInfo = "/applet/company-pay/get-user-info",
        relieveWxBind = "/applet/company-pay/RelieveWxBind",
        wxBind="/applet/company-pay/bind",
        // 获取用户钱包金额
        wallet = '/applet/info/wallet',
        incomeList = "/applet/info/IncomeList"
    }
}
