var bashPath = "http://192.168.27.55:9080/mcy";
bashPath = "http://www.mengcy.com/mcyapi-deploy";
// bashPath = "/mcyapi-deploy";
// bashPath = "http://localhost:9080";
bashPath = "/api";

export var urlPath = {
    banner:bashPath+"/banner/getBanners",
    activity:bashPath+"/activity/selectActivityByType",
    discuss:{
        queryDiscussByMarket:bashPath+"/discuss/queryDiscussByMarket",
        recommendDiscuss:bashPath+"/discuss/recommendDiscuss",
        recentFans:bashPath+"/discuss/recentFans",
        anwserLess:bashPath+"/discuss/anwserLess",
        allDiscuss:bashPath+"/discuss/allDiscuss",
        recentSpecial:bashPath+"/discuss/recentSpecial",
        detail:bashPath+"/discuss/detail",
        queryAllChatDis:bashPath+"/discuss/queryAllChatDis",
        querySpecialDiscuss:bashPath+"/discuss/querySpecialDiscuss",
    },
    user:{
        login:bashPath+"/user/login",
        queryUserThumbnail:bashPath+"/user/queryUserThumbnail",
        updateUserInfo:bashPath+"/user/updateUserInfo",
        registered:bashPath+"/user/registered",
        findUserBaseInfoDtoByUserId:bashPath+"/user/findUserBaseInfoDtoByUserId",
        
    },
    common:{
        singleUploadFile:bashPath+"/upload/singleUploadFile",
        supportWorks:bashPath+"/wx/qrcode",
        supportWorksAliPay:bashPath+"/alipay/qrcode",
        
        sendMessage:bashPath+"/mobile/sendMessage",
        validateMobilePhoneCaptcha:bashPath+"/mobile/validateMobilePhoneCaptcha",
        validateMobilePhoneCaptchaReturnCode:bashPath+"/mobile/validateMobilePhoneCaptchaReturnCode",
        
        getProvinceList:bashPath+"/common/getProvinceList",
        getByParentId:bashPath+"/common/getByParentId",
        selectAll:bashPath+"/common/selectAll",
        supportWorksReturnId: bashPath+"/works/works/supportWorksReturnId",
        checkOrderStatus: bashPath+"/works/works/checkOrderStatus",
        
    },
    support:{
        orderList:bashPath+"/works/works/queryOrderList",
        queryPutSupportGiftList:bashPath+"/works/works/queryPutSupportGiftList",
        
    },
    findInteractionBaseDto:bashPath+"/interaction/findInteractionBaseDto",
    findMarketInfo:bashPath+"/works/works/findMarketInfo",
    novel:{
        selectNovel:bashPath+"/works/novel/selectNovel",
        hotFan:bashPath+"/works/novel/hotFans",
        hotOrigNovel:bashPath+"/works/novel/hotOriginalNovel",
        recentFans:bashPath+"/works/novel/recentFans",
        recentActiveUserByType:bashPath+"/works/works/recentActiveUserByType",
        hotNovelWeek:bashPath+"/works/novel/hotNovelWeek",
        hotNovelToday:bashPath+"/works/novel/hotNovelToday",
        recentFansNovel:bashPath+"/works/novel/recentFansNovel",
        recentOriginalNovel:bashPath+"/works/novel/recentOriginalNovel",
        commentPublish:bashPath+"/comment/publish",
        queryCommentList:bashPath+"/comment/queryList",
        querySingle:bashPath+"/comment/querySingle",
        praiseadd:bashPath+"/praise/add",
        praisedelete:bashPath+"/praise/delete",
        collectadd:bashPath+"/collect/add",
        collectdelete:bashPath+"/collect/delete",
        collectUser:bashPath+"/userFriend/collectUser",
        findNovelDetail:bashPath+"/works/novel/findNovelDetail",

        recentSupport:bashPath+"/works/novel/recentSupport",
        hotSupport:bashPath+"/works/novel/hotSupport",
        queryDiscussByMarket:bashPath+"/works/discuss/queryDiscussByMarket",
        selectActivityByType:bashPath+"/works/activity/selectActivityByType",

        findMarketNum:bashPath+"/works/works/findMarketNum",
        queryRoleMarketLevel:bashPath+"/works/novel/queryRoleMarketLevel",
        hotFansNovelWeek:bashPath+"/works/novel/hotFansNovelWeek",
        hotFansNovelToday:bashPath+"/works/novel/hotFansNovelToday",

        queryAllOriginalNovel:bashPath+"/works/novel/queryAllOriginalNovel",
        findTopWriterDto:bashPath+"/works/novel/findTopWriterDto",

        publishNovel:bashPath+"/works/novel/publishNovel",
        addSerial:bashPath+"/works/serial/addSerial",
        recommendCover:bashPath+"/works/works/recommendCover",
        recommendMarkets:bashPath+"/works/works/recommendMarket",
        querySerialByUserId:bashPath+"/works/serial/querySerialByUserId",
        
        findNovelBaseByMarket:bashPath+"/works/novel/findNovelBaseByMarket"
    },
    cos:{
        selectCos:bashPath+"/works/cos/selectCos",
        hotCos:bashPath+"/works/cos/hotCos",
        recentFans:bashPath+"/works/cos/recentFans",
        hotWeakCos:bashPath+"/works/cos/hotWeekCos",
        hotSupport:bashPath+"/works/cos/hotSupport",
        recentSupport:bashPath+"/works/cos/recentSupport",
        hotTodayCos:bashPath+"/works/cos/hotTodayCos",
        recentPositiveCos:bashPath+"/works/cos/recentPositiveCos",
        recentTrailerCos:bashPath+"/works/cos/recentTrailerCos",
        getParticularCos:bashPath+"/works/cos/getParticularCos",
        queryclubcos:bashPath+"/works/cos/queryclubcos",
        publishCos:bashPath+"/works/cos/publishCos",
        
        
        findMarketNum:bashPath+"/works/works/findMarketNum",
        findRoleMarketNum:bashPath+"/works/works/findRoleMarketNum",

        findTopCoserDto:bashPath+"/works/cos/findTopCoserDto",
        findCosDetail:bashPath+"/works/cos/findCosDetail"
    },
    paint:{
        selectPainter:bashPath+"/works/painter/selectPainter",
        hotPainter:bashPath+"/works/painter/hotPainter",

        publishPainter:bashPath+"/works/painter/publishPainter",
        painterDetail:bashPath+"/works/painter/findPainterDetail",
        hotSupport:bashPath+"/works/painter/hotSupport",
        createArt:bashPath+"/works/painter/createArt",
        queryMyArt:bashPath+"/works/painter/queryMyArt",
        
        recentSupport:bashPath+"/works/painter/recentSupport",
        hotWeekPainter:bashPath+"/works/painter/hotWeekPainter",
        hotTodayPainter:bashPath+"/works/painter/hotTodayPainter",
        recentFansPainter:bashPath+"/works/painter/recentFansPainter",
        recentOriginalPainter:bashPath+"/works/painter/recentOriginalPainter",
        recentFans:bashPath+"/works/painter/recentFans",
        findTopPainterDto:bashPath+"/works/painter/findTopPainterDto",
        recentArt:bashPath+"/works/painter/recentArt",
        artDetail:bashPath+"/works/painter/toArtDetail"        
    },
    test:{
        test:bashPath+"/doctorUser/produceQrCode?type=1&qrCode=1235464",
    },
    music: {
        findMusicDetail: bashPath+"/works/music/findMusicDetail",
        musicSinger: bashPath+"/works/music/topMusicer",
        findPlayListDetail: bashPath+"/works/music/findPlayListDeatil",
        publish: bashPath+"/works/music/publish",
        hotMusic: bashPath+"/works/music/hotMusic",
        
    },
    danmu: {
        queryList: bashPath+ "/danmu/queryList",
        publishDanmu: bashPath + "/danmu/publishDanmu"
    }
}
    
