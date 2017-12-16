// 引入单个页面（组件导入）
import WrIndex from '../components/wrIndex/index';
import NovelDetail from '../components/wrIndex/novelDetail/NovelDetail';
import FanDetail from '../components/wrIndex/fanDetail/FanDetail';
import NovelCreater from '../components/wrIndex/novelCreater/NovelCreater';

import CosIndex from '../components/cosIndex/index';
import CosPage from '../components/cosIndex/cospage/CosPage';
import CosDetail from '../components/cosIndex/cosdetail/CosDetail';
import ReleaseCos from '../components/cosIndex/releasecos/releaseCos';

import CosOrigDetail from '../components/cosIndex/cosorigdetail/CosOrigDetail';
import DiscussIndex from '../components/discuss/Index';
import PaintIndex from '../components/paintIndex/index';
import PaintDetail from '../components/paintIndex/paintdetail/PaintDetail';
import PaintAlbum from '../components/paintIndex/album/PaintAlbum'

import Login from '../components/loginregiste/Login';
import Registe from '../components/loginregiste/Registe';

import Protocol from '../components/protocol/Protocol';
// import Main from '../components/discuss/Main';
import Special from '../components/discuss/Special';
import SupportDetail from '../components/user/SupportDetail';
import Support from '../components/user/Support';
import UserIndex from '../components/user/UserIndex';
import Paintcreate from '../components/paintIndex/paintcreate/paintcreate';


import Favorite from '../components/user/Favorite';
import Feed from '../components/user/Feed';
import Order from '../components/user/Order';
import MusicIndex from '../components/music/MusicIndex';
import MusicDetail from '../components/music/MusicDetail';
import MusicSinger from '../components/music/MusicSinger';
import MusicUpload from '../components/music/MusicUpload';
import MusicSheet from '../components/music/MusicSheet';
import MusicRank from '../components/music/MusicRank';


import MessageIndex from '../components/user/message/MessageIndex';
import GetMessage from '../components/user/message/GetMessage';
import ForgotPassword from '../components/user/ForgotPassword';
//import Index from '../components/index/Index';



export function initPages(){
    return [
        {path:"wrindex(/:id)(/:id)",com:WrIndex,module:"wrindex"},
        {path:"wrnoveldetail",com:NovelDetail,module:"wrindex"},
        {path:"wrfandetail",com:FanDetail,module:"wrindex"},
        {path:"wrcreater",com:NovelCreater,module:"wrindex"},

        {path:"cosindex(/:id)(/:id)",com:CosIndex,module:"cosindex"},
        {path:"cosdetail",com:CosDetail,module:"cosindex"},
        {path:"cospage",com:CosPage,module:"cosindex"},
        {path:"login",com:Login,module:"wrindex"},
        {path:"discussIndex(/:id)",com:DiscussIndex,module:"cosindex"},

        {path:"protocol(/:id)",com:Protocol,module:"cosindex"},

        {path:"paintindex(/:id)(/:id)",com:PaintIndex,module:"paintindex"},

        {path:"paintdetail",com:PaintDetail,module:"paintindex"},
        {path:"paintcreate",com:Paintcreate,module:"paintindex"},
        
        {path:"album",com:PaintAlbum,module:"paintindex"},


        // {path:"main",com:Main,module:"cosindex"},
         {path:"special",com:Special,module:"cosindex"},
        {path:"supportDetail",com:SupportDetail,module:"cosindex"},
        {path:"support",com:Support,module:"cosindex"},
        {path:"userIndex(/:id)",com:UserIndex,module:"cosindex"},

        // {path:"musicIndex",com:MusicIndex,module:"cosindex"},

        {path:"favorite",com:Favorite,module:"cosindex"},
        {path:"feed",com:Feed,module:"cosindex"},  
        {path:"order",com:Order,module:"cosindex"}, 
        {path:"musicIndex",com:MusicIndex,module:"cosindex"},
        {path:"registe",com:Registe,module:"cosindex"},
        
        {path:"musicDetail",com:MusicDetail,module:"cosindex"},
        {path:"getMessage",com:GetMessage,module:"cosindex"},
        {path:"forgotpassword",com:ForgotPassword,module:"cosindex"},
        {path:"messageIndex(/:id)",com:MessageIndex,module:"cosindex"},
        {path:"forgotPassword",com:ForgotPassword,module:"cosindex"},
        {path:"releaseCos",com:ReleaseCos,module:"cosindex"},
        {path:"musicSinger",com:MusicSinger,module:"cosindex"},
        {path:"musicUpload",com:MusicUpload,module:"cosindex"},
        {path:"musicSheet",com:MusicSheet,module:"cosindex"},
        {path:"musicRank",com:MusicRank,module:"cosindex"},
        
     //   {path:"index",com:Index,module:"cosindex"},
        
        
    ]
}
