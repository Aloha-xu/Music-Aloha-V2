import { request } from "./request";

/* FindMusic => recommend 组件下的API */
/* 轮播图 */
export function getBanner() {
  return request({
    url: "/banner?type=0",
  });
}

/* 获取推荐歌单  */
export function getPersonalized() {
  return request({
    url: "/personalized",
  });
}

/* 获取歌单分类 */
export function getSongListType() {
  return request({
    url: "/playlist/catlist",
  });
}

/* 获取歌单(网友的) 
cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
limit: 取出歌单数量 , 默认为 50
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值

偏移量就是向后偏移x个数据
*/
export function getSongList(cat, limit, offset) {
  return request({
    url: "/top/playlist",
    params: {
      cat,
      limit,
      offset,
    },
  });
}

// * 获取歌单detail√  传入歌单id
export function getSongListDetail(id, s) {
  let timestamp = new Date().getTime();
  return request({
    url: "/playlist/detail",
    params: {
      id,
      s,
      timestamp,
    },
  });
}

export function getAlbumListDetail(id) {
  let timestamp = new Date().getTime();
  return request({
    url: "/album",
    params: {
      id,
      timestamp,
    },
  });
}

/* 获取热门歌单分类 */
export function getHotSongListType() {
  return request({
    url: "/playlist/hot",
  });
}

/* 获取精品歌单标签列表 */
export function getTopSonglistType() {
  return request({
    url: "/playlist/highquality/tags",
  });
}

/*  获取精品歌单 （精品歌单 就是 需要点击进去精品歌单页面的歌单信息）
可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
limit: 取出歌单数量 , 默认为 20
before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
*/
export function getTopSonglist(cat, limit, before) {
  return request({
    url: "/top/playlist/highquality",
    params: {
      cat,
      limit,
      before,
    },
  });
}

/* 独家放送 入口列表 */
export function getExclusivePush() {
  return request({
    url: "/personalized/privatecontent",
  });
}
/* 独家放送详细列表 
limit : 返回数量 , 默认为 60
offset : 偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0
/personalized/privatecontent/list?limit=1&offset=2
*/
export function getDetailExclusivePush() {
  return request({
    url: "/personalized/privatecontent/list",
  });
}

///////////////////////////////////////播放器Player/////////////////////////////////////

// *  获取歌曲的详情  获取歌曲的详细信息
//参数：ids 可以是多个id，用逗号隔开
// s 歌单收藏者人数
export function getSongDetail(ids) {
  return request({
    //不用params传参 自动填充到url后面
    //传入的参数是数组 自动填充的时候会出错
    //原因应该是会变成传入多个空数组 再对该数组赋值
    url: `/song/detail?ids=${ids}`,
    /* url:'/song/detail',
        params:{
            ids,
        } */
  });
}

// 说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌单
// 必选参数 : id: 歌曲 id
// 接口地址 : /simi/playlist
// 调用例子 : /simi/playlist?id=347230 ( 对应 ' 光辉岁月 ' 相似歌单 )
export function getSimiPlayList(id) {
  return request({
    url: "/simi/playlist",
    params: {
      id,
    },
  });
}

// * 获取音乐url
// 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
// 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
// 必选参数 : id : 音乐 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
// 接口地址 : /song/url
// 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
export function getSongUrl(id) {
  return request({
    url: `/song/url?id=${id}`,
  });
}

// * 获取音乐歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
// 必选参数 : id: 音乐 id
// 接口地址 : /lyric
// 调用例子 : /lyric?id=33894312
export function getSongLyric(id) {
  return request({
    url: `lyric?id=${id}`,
  });
}

//判断音乐是否有版权
// 说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
// 必选参数 : id : 歌曲 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
// 接口地址 : /check/music
// 调用例子 : /check/music?id=33894312
export function getCheckMusic(id) {
  return request({
    url: "/check/music",
    params: {
      id,
    },
  });
}

//////////////////////////////////////////////////////////////////////////////////////

/* 推荐新音乐 */
export function getPersonalizedNewSong(limit) {
  return request({
    url: `/personalized/newsong?limit=${limit}`,
  });
}

//findmusic - recommend - radio 电台  这个api没找到对应的
export function getRecommendRadioStation() {
  return request({
    url: "/personalized/djprogram",
  });
}

/* 获取歌手分类列表 */
/* 这个接口的type参数传不进去 不知道为什么 */
export function getArtistsList(type, area, initial, limit, offset) {
  return request({
    url: "/artist/list",
    params: {
      type,
      area,
      initial,
      limit,
      offset,
    },
  });
}

// 说明 : 调用此接口,可获取歌手分类列表

// 可选参数 :

// limit : 返回数量 , 默认为 30

// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,
//如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0

// type 取值:
// -1:全部
// 1:男歌手
// 2:女歌手
// 3:乐队

// area 取值:
// -1:全部
// 7华语
// 96欧美
// 8:日本
// 16韩国
// 0:其他
// 接口地址 : /artist/list
// 调用例子 : /artist/list?type=1&area=96&initial=b /artist/list?type=2&area=2&initial=b

// * 所有榜单
export function getTopList() {
  return request({
    url: "/toplist",
  });
}

// * 所有榜单内容摘要 这个api没什么必要 感觉
export function getTopListDetail() {
  return request({
    url: "/toplist/detail",
  });
}

export function getCollector(id, limit, offset) {
  return request({
    url: "/playlist/subscribers",
    params: {
      id,
      limit,
      offset,
    },
  });
}

///////////////////////////评论////////////////////////////////////

//歌单评论信息
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )
// 必选参数 : id: 歌单 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
// 接口地址 : /comment/playlist
// 调用例子 : /comment/playlist?id=705123491
export function getPlayListComment(id, limit) {
  return request({
    url: "/comment/playlist",
    params: {
      id,
      limit,
    },
  });
}

//某一首歌曲的评论信息
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该音乐的所有评论 ( 不需要登录 )
// 必选参数 : id: 音乐 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
// 接口地址 : /comment/music
// 调用例子 : /comment/music?id=186016&limit=1 对应晴天评论
export function getMusicComment(id, limit) {
  return request({
    url: "/comment/music",
    params: {
      id,
      limit,
    },
  });
}

// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
// 必选参数 : id: 专辑 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
// 接口地址 : /comment/album
// 调用例子 : /comment/album?id=32311
export function getAlbumComment(id, limit) {
  return request({
    url: "/comment/album",
    params: {
      id,
      limit,
    },
  });
}

// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
// 必选参数 : id: mv id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
// 接口地址 : /comment/mv
// 调用例子 : /comment/mv?id=5436712
export function getMvComment(id, limit) {
  return request({
    url: "/comment/mv",
    params: {
      id,
      limit,
    },
  });
}

//这个接口好像有问题 返回的数据null
// 说明 : 调用此接口 , 传入资源类型和资源id,以及排序方式,可获取对应资源的评论
// 必选参数 :
// id : 资源 id, 如歌曲 id,mv id
// tpye: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
// 0: 歌曲
// 1: mv
// 2: 歌单
// 3: 专辑
// 4: 电台
// 5: 视频
// 6: 动态
// 可选参数 :
// pageNo:分页参数,第N页,默认为1
// pageSize:分页参数,每页多少条数据,默认20
// sortType: 排序方式,1:按推荐排序,2:按热度排序,3:按时间排序
// cursor: 当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
// 接口地址 : /comment/new
// 调用例子 : /comment/new?type=0&id=1407551413&sortType=3, /comment/new?type=0&id=1407551413&sortType=3&cursor=1602072870260&pageSize=20&pageNo=2

export function getComment(id, type, pageNo) {
  return request({
    url: "/comment/new",
    params: {
      id,
      type,
      pageNo,
    },
  });
}

//////////////////////////////歌手////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
// 必选参数 : id: 歌手 id
// 接口地址 : /artist/detail
// 调用例子 : /artist/detail?id=11972054 (Billie Eilish)
export function getArtistDetail(id) {
  return request({
    url: "/artist/detail",
    params: {
      id,
    },
  });
}

// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
// 必选参数 : id: 歌手 id
// 接口地址 : /artist/desc
// 调用例子 : /artist/desc?id=6452 ( 周杰伦 )
export function getArtistDesc(id) {
  return request({
    url: "/artist/desc",
    params: {
      id,
    },
  });
}

// 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
// 必选参数 : id: 歌手 id
// 接口地址 : /simi/artist
// 调用例子 : /simi/artist?id=6452 ( 对应和周杰伦相似歌手 )
export function getSimiArtist(id) {
  return request({
    url: "/simi/artist",
    params: {
      id,
    },
  });
}

// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?id=6452,/mv?mvid=5461064
// 必选参数 : id: 歌手 id, 可由搜索接口获得
// 接口地址 : /artist/mv
// 调用例子 : /artist/mv?id=6452
export function getArtistMV(id) {
  return request({
    url: "/artist/mv",
    params: {
      id,
    },
  });
}

// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
// 必选参数 : id: 歌手 id
// 可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /artist/album
// 调用例子 : /artist/album?id=6452&limit=30 ( 周杰伦 )
export function getArtistAlbum(id, limit) {
  return request({
    url: "/artist/album",
    params: {
      id,
      limit,
    },
  });
}

////////////////////////////////////////搜索//////////////////////////////////////////////////////

// 搜索
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
// 必选参数 : keywords : 关键词
// 可选参数 : limit : 返回数量 , 默认为 30
//          offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
//          type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
// 接口地址 : /search 或者 /cloudsearch(更全)
// 调用例子 : /search?keywords= 海阔天空 /cloudsearch?keywords= 海阔天空
export function getCloudSearch(keywords, type) {
  return request({
    url: "/cloudsearch",
    params: {
      keywords,
      type,
    },
  });
}

// 默认搜索关键词
// 说明 : 调用此接口 , 可获取默认搜索关键词
// 接口地址 : /search/default
export function getDefaultSearch() {
  return request({
    url: "/search/default",
  });
}

// 热搜列表(简略)
// 说明 : 调用此接口,可获取热门搜索列表
// 接口地址 : /search/hot
// 调用例子 : /search/hot
export function getHotSearch() {
  return request({
    url: "/search/hot",
  });
}

// 热搜列表(详细)
// 说明 : 调用此接口,可获取热门搜索列表
// 接口地址 : /search/hot/detail
// 调用例子 : /search/hot/detail
export function getHotSearchDetail() {
  return request({
    url: "/search/hot/detail",
  });
}

// 搜索建议
// 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
// 必选参数 : keywords : 关键词
// 可选参数 : type : 如果传 'mobile' 则返回移动端数据
// 接口地址 : /search/suggest
// 调用例子 : /search/suggest?keywords= 海阔天空 /search/suggest?keywords= 海阔天空&type=mobile
export function getSearchSuggest(keywords) {
  return request({
    url: "/search/suggest",
    params: {
      keywords,
    },
  });
}

// 搜索多重匹配  得出的结果的搜索框传入关键字 然后搜索框的下拉框的搜索建议的 数据
// 说明 : 调用此接口 , 传入搜索关键词可获得搜索结果
// 必选参数 : keywords : 关键词
// 接口地址 : /search/multimatch
// 调用例子 : /search/multimatch?keywords= 海阔天空
export function getSearchMultimatch(keywords) {
  return request({
    url: "/search/multimatch",
    params: {
      keywords,
    },
  });
}

///////////////////////////////////////////////////////////////视频//////////////////////////////////////////////////////

// 获取视频分类列表
// 说明 : 调用此接口 , 可获取视频分类列表
// 接口地址 : /video/category/list
// 调用例子 : /video/category/list
export function getVideoCategoryList() {
  return request({
    url: "/video/group/list",
  });
}

// 获取视频标签/分类下的视频
// 说明 : 调用此接口 , 传入标签/分类id,可获取到相关的视频,分页参数只能传入offset
// 必选参数 : id:  id
// 可选参数 : offset: 默认0
// 接口地址 : /video/group
// 调用例子 : /video/group?id=9104
export function getVideoType(id, offset) {
  return request({
    url: "/video/group",
    params: {
      id,
      offset,
    },
  });
}

// 获取推荐视频
// 说明 : 调用此接口, 可获取推荐视频,分页参数只能传入offset
// 可选参数 : offset: 默认0
// 接口地址 : /video/timeline/recommend
// 调用例子 : /video/timeline/recommend?offset=10
export function getRecommendVideo(id, offset) {
  return request({
    url: "/video/timeline/recommend",
    params: {
      id,
      offset,
    },
  });
}

// 相关视频
// 说明 : 调用此接口 , 可获取相关视频
// 必选参数 : id: 视频 的 id
// 接口地址 : /related/allvideo
// 调用例子 : /related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D
export function getAllVideo(id) {
  return request({
    url: "/related/allvideo",
    params: {
      id,
    },
  });
}

// 视频详情
// 说明 : 调用此接口 , 可获取视频详情
// 必选参数 : id: 视频 的 id
// 接口地址 : /video/detail
// 调用例子 : /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D
export function getVideoDetail(id) {
  return request({
    url: "/video/detail",
    params: {
      id,
    },
  });
}

// 获取视频点赞转发评论数数据
// 说明 : 调用此接口 , 传入 vid ( 视频id ) , 可获取对应视频点赞转发评论数数据 必选参数 : vid: 视频id
// 接口地址 : /video/detail/info
// 调用例子 : /video/detail/info?vid=89ADDE33C0AAE8EC14B99F6750DB954D
export function getVideoDetailInfo(vid) {
  return request({
    url: "/video/detail/info",
    params: {
      vid,
    },
  });
}

// 获取视频播放地址
// 说明 : 调用此接口 , 传入视频 id,可获取视频播放地址
// 必选参数 : id: 视频 的 id
// 接口地址 : /video/url
// 调用例子 : /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D
export function getVideoUrl(id) {
  return request({
    url: "/video/url",
    params: {
      id,
    },
  });
}

// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 视频 的所有评论 ( 不需要登录 )
// 必选参数 : id: 视频的 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
// 接口地址 : /comment/video
// 调用例子 : /comment/video?id=89ADDE33C0AAE8EC14B99F6750DB954D
export function getVideoComment(id) {
  return request({
    url: "/comment/video",
    params: {
      id,
    },
  });
}

////////////////////////////////////////////////////////MV////////////////////////////////////////////////////////////////

// mv 排行
// 说明 : 调用此接口 , 可获取 mv 排行
// 可选参数 : limit: 取出数量 , 默认为 30
// area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
// 接口地址 : /top/mv
// 调用例子 : /top/mv?limit=10

// 获取 mv 数据
// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
// 必选参数 : mvid: mv 的 id
// 接口地址 : /mv/detail
// 调用例子 : /mv/detail?mvid=5436712
export function getMvDetail(mvid) {
  return request({
    url: "/mv/detail",
    params: {
      mvid,
    },
  });
}

// mv 数据
// 获取 mv 点赞转发评论数数据
// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据
// 必选参数 : mvid: mv 的 id
// 接口地址 : /mv/detail/info
// 调用例子 : /mv/detail/info?mvid=5436712
export function getMvCommentInfo(mvid) {
  return request({
    url: "/mv/detail/info",
    params: {
      mvid,
    },
  });
}

// mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
// 必选参数 : id: mv id
// 可选参数 : r: 分辨率,默认1080,可从 /mv/detail 接口获取分辨率列表
// 接口地址 : /mv/url
// 调用例子 :
// /mv/url?id=5436712 /mv/url?id=10896407&r=1080
export function getMvUrl(id) {
  return request({
    url: "/mv/url",
    params: {
      id,
    },
  });
}

// 全部 mv
// 说明 : 调用此接口 , 可获取全部 mv
// 可选参数 :
// area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
// order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
// limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /mv/all
// 调用例子 : /mv/all?area=港台
export function getAllMv(area, type, order, limit, offset) {
  return request({
    url: "/mv/all",
    params: {
      area,
      limit,
      type,
      order,
      offset,
    },
  });
}

// 最新 mv
// 说明 : 调用此接口 , 可获取最新 mv
// 可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
// 可选参数 : limit: 取出数量 , 默认为 30
// 接口地址 : /mv/first
// 调用例子 : /mv/first?limit=10
export function getNewMv(area, limit) {
  return request({
    url: "/mv/first",
    params: {
      area,
      limit,
    },
  });
}

// 网易出品mv
// 说明 : 调用此接口 , 可获取网易出品 mv
// 可选参数 : limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
// 接口地址 : /mv/exclusive/rcmd
// 调用例子 : /mv/exclusive/rcmd?limit=10
export function getWYCPMv(limit) {
  return request({
    url: "/mv/exclusive/rcmd",
    params: {
      limit,
    },
  });
}

// 推荐 mv
// 说明 : 调用此接口 , 可获取推荐 mv
// 接口地址 : /personalized/mv
// 调用例子 : /personalized/mv
export function getRecommentMv() {
  return request({
    url: "/personalized/mv",
  });
}

///////////////////////////////////////私人FM////////////////////////////////////

//获取私人fm歌单
export function fm() {
  let timestamp = new Date().getTime();
  return request({
    url: "/personal_fm",
    params: {
      timestamp,
    },
  });
}

///////////////////////////////////////////创建歌单接口///////////////////////////////////////

// 获取用户信息 , 歌单，收藏，mv, dj 数量
// 说明 : 登录后调用此接口 , 可以获取用户信息
// 接口地址 : /user/subcount
// 调用例子 : /user/subcount
export function getsubcount() {
  return request({
    url: "/user/subcount",
  });
}

// 获取用户歌单
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
// 必选参数 : uid : 用户 id
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /user/playlist
// 调用例子 : /user/playlist?uid=32953014
export function getUserPlaylist(uid) {
  let timestamp = new Date().getTime();
  return request({
    url: "/user/playlist",
    params: {
      uid,
      timestamp,
    },
  });
}

// 更新歌单
// 说明 : 登录后调用此接口,可以更新用户歌单
// 必选参数 :
// id:歌单id
// name:歌单名字
// desc:歌单描述
// tags:歌单tag ,多个用 `;` 隔开,只能用官方规定标签
// 接口地址 : /playlist/update
// 调用例子 : /playlist/update?id=24381616&name=新歌单&desc=描述&tags=欧美
export function updataUserPlaylist(id, name, desc, tags) {
  return request({
    url: "/playlist/update",
    params: {
      id,
      name,
      desc,
      tags,
    },
  });
}

// 更新歌单简介
// 说明 : 登录后调用此接口,可以单独更新用户歌单描述
// 必选参数 :
// id:歌单id
// desc:歌单描述
// 接口地址 : /playlist/desc/update
// 调用例子 : /playlist/desc/update?id=24381616&desc=描述
export function updataUserPlaylistDesc(id, desc) {
  return request({
    url: "/playlist/desc/update",
    params: {
      id,
      desc,
    },
  });
}

// 更新歌单名
// 说明 : 登录后调用此接口,可以单独更新用户歌单名
// 必选参数 :
// id: 歌单id
// name: 歌单名
// 接口地址 : /playlist/name/update
// 调用例子 : /playlist/name/update?id=24381616&name=歌单名
export function updataUserPlaylistName(id, name) {
  return request({
    url: "/playlist/name/update",
    params: {
      id,
      name,
    },
  });
}

// 更新歌单标签
// 说明 : 登录后调用此接口,可以单独更新用户歌单标签
// 必选参数 :
// id: 歌单id
// tags: 歌单标签
// 接口地址 : /playlist/tags/update
// 调用例子 : /playlist/tags/update?id=24381616&tags=学习
export function updataUserPlaylistTags(id, tags) {
  return request({
    url: "/playlist/tags/update",
    params: {
      id,
      tags,
    },
  });
}

// 歌单封面上传
// 说明 : 登录后调用此接口,使用'Content-Type': 'multipart/form-data'上传图片formData(name为'imgFile'),可更新歌单封面(参考:https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/playlist_cover_update.html)
// 必选参数 :
// id: 歌单id 3143833470
// 可选参数 :
// imgSize : 图片尺寸,默认为300
// imgX : 水平裁剪偏移,方形图片可不传,默认为0 imgY : 垂直裁剪偏移,方形图片可不传,默认为0
// 接口地址 : /playlist/cover/update
// 调用例子 : /playlist/cover/update?id=3143833470&imgSize=200
export function updataUserPlaylistCover({ formData, id, imgSize }) {
  return request({
    url: `/playlist/cover/update?id=${id}&imgSize=${imgSize}&imgX=0&imgY=0`,
    method: "post",
    data: formData,
    ContentType: "multipart/form-data",
  });
}

// 调整歌单顺序
// 说明 : 登录后调用此接口,可以根据歌单id顺序调整歌单顺序
// 必选参数 :
// ids: 歌单id列表
// 接口地址 : /playlist/order/update
// 调用例子 : /playlist/order/update?ids=[111,222]
export function updataUserPlaylistOrder(ids) {
  return request({
    url: "/playlist/order/update",
    params: {
      ids,
    },
  });
}

// 调整歌曲顺序
// 说明 : 登录后调用此接口,可以根据歌曲id顺序调整歌曲顺序
// 必选参数 :
// pid: 歌单id
// ids: 歌曲id列表
// 接口地址 : /song/order/update
// 调用例子 : /song/order/update?pid=2039116066&ids=[5268328,1219871]
export function updataUserSongOrder(pid, ids) {
  return request({
    url: "/song/order/update",
    params: {
      pid,
      ids,
    },
  });
}

// 收藏/取消收藏歌单
// 说明 : 调用此接口 , 传入类型和歌单 id 可收藏歌单或者取消收藏歌单
// 必选参数 :
// t : 类型,1:收藏,2:取消收藏 id : 歌单 id
// 接口地址 : /playlist/subscribe
// 调用例子 : /playlist/subscribe?t=1&id=106697785 /playlist/subscribe?t=2&id=106697785
export function subPlaylist(t, id) {
  return request({
    url: "/playlist/subscribe",
    params: {
      t,
      id,
    },
  });
}

////////////////////////////////////////喜欢//////////////////////////////////

// 喜欢音乐
// 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
// 必选参数 : id: 歌曲 id
// 可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
// 接口地址 : /like
// 调用例子 : /like?id=347230
export function setLike(id, like) {
  let timestamp = new Date().getTime();
  return request({
    url: "/like",
    params: {
      id,
      like,
      timestamp,
    },
  });
}

// 喜欢音乐列表
// 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
// 必选参数 : uid: 用户 id
// 接口地址 : /likelist
// 调用例子 : /likelist?uid=32953014
export function getLikeList(uid) {
  let timestamp = new Date().getTime();
  return request({
    url: "/likelist",
    params: {
      uid,
      timestamp,
    },
  });
}

/////////////////////////////////////////////////////私信/////////////////////////////////////////////////////////////////

// 发送私信
// 说明 : 登录后调用此接口 , 传入用户 id 和要发送的信息, 可以发送私信,返回内容为历史私信,包含带歌单的私信信息(注:不能发送私信给自己)
// 必选参数 :
// user_ids : 用户 id,多个需用逗号隔开
// msg : 要发送的信息
// 接口地址 : /send/text
// 调用例子 : /send/text?user_ids=32953014&msg=test,/send/text?user_ids=32953014,475625142&msg=test
export function SendText(user_ids, msg) {
  return request({
    url: "/send/text",
    params: {
      user_ids,
      msg,
    },
  });
}

// 发送私信(带歌曲)
// 说明 : 登录后调用此接口 , 传入用户 id 和要发送的信息,音乐id, 可以发送音乐私信,返回内容为历史私信
// 必选参数 :
// user_ids : 用户 id,多个需用逗号隔开
// id : 要发送音乐的id
// msg : 要发送的信息
// 接口地址 : /send/song
// 调用例子 : /send/song?user_ids=1&id=351318&msg=测试

// 发送私信(带专辑)
// 说明 : 登录后调用此接口 , 传入用户 id 和要发送的信息,专辑id, 可以发送专辑私信,返回内容为消息id
// 必选参数 :
// user_ids : 用户 id,多个需用逗号隔开
// id : 要发送专辑的id
// msg : 要发送的信息
// 接口地址 : /send/album
// 调用例子 : /send/album?user_ids=1&id=351318&msg=测试

// 发送私信(带歌单)
// 说明 : 登录后调用此接口 , 传入用户 id 和要发送的信息和歌单 id, 可以发送带歌单的私信(注:不能发送重复的歌单)
// 必选参数 :
// user_ids : 用户 id,多个需用逗号隔开
// msg : 要发送的信息
// 接口地址 : /send/playlist
// 调用例子 : /send/playlist?msg=test&user_ids=475625142&playlist=705123491,/send/playlist?msg=test2&user_ids=475625142,32953014&playlist=705123493

// 最近联系人
// 说明 : 登录后调用此接口 ,可获取最接近联系人
// 接口地址 : /msg/recentcontact
// 调用例子 : /msg/recentcontact

// 私信内容
// 说明 : 登录后调用此接口 , 可获取私信内容
// 必选参数 : uid : 用户 id
// 可选参数 : limit : 返回数量 , 默认为 30
// before : 分页参数,取上一页最后一项的 time 获取下一页数据
// 接口地址 : /msg/private/history
// 调用例子 : /msg/private/history?uid=9003 (云音乐小秘书)
export function getPrivateMsgHistory(uid) {
  return request({
    url: "/msg/private/history",
    params: {
      uid,
    },
  });
}

/////////////////////////////////////////////////////////////通知////////////////////////////////////////////////////////////////////

// 通知 - 私信
// 说明 : 登录后调用此接口 ,可获取私信
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /msg/private
// 调用例子 : /msg/private?limit=3
export function getMsgHistory() {
  return request({
    url: "/msg/private",
  });
}

// 通知 - 评论
// 说明 : 登录后调用此接口 ,可获取评论
// 必选参数 : uid: 用户 的 id，只能和登录账号的 id 一致
// 可选参数 :
// limit : 返回数量 , 默认为 30
// before : 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
// 接口地址 : /msg/comments
// 调用例子 : /msg/comments?uid=32953014
export function getMsgComments(uid) {
  return request({
    url: "/msg/comments",
    params: {
      uid,
    },
  });
}

// 通知 - @我
// 说明 : 登录后调用此接口 ,可获取@我数据
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /msg/forwards
// 调用例子 : /msg/forwards?limit=3
export function getMsgToMe() {
  return request({
    url: "/msg/forwards",
  });
}

// 通知 - 通知
// 说明 : 登录后调用此接口 ,可获取通知
// 可选参数 :
// limit : 返回数量 , 默认为 30
// lasttime : 返回数据的 time ,默认-1,传入上一次返回结果的 time,将会返回下一页的数据
// 接口地址 : /msg/notices
// 调用例子 : /msg/notices?limit=3
export function getMsgNotices(lasttime) {
  return request({
    url: "/msg/notices",
    params: {
      lasttime,
    },
  });
}

///////////////////////////////////////////////////////////////////////////////////用户//////////////////////////////////////////////////////////////////////////////////////
// 关注/取消关注用户
// 说明 : 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
// 必选参数 :
// id : 用户 id
// t : 1为关注,其他为取消关注
// 接口地址 : /follow
// 调用例子 : /follow?id=32953014&t=1
export function setFollow(id, t) {
  let timestamp = new Date().getTime();
  return request({
    url: "/follow",
    params: {
      id,
      t,
      timestamp,
    },
  });
}

// 数字专辑-新碟上架
// 说明 : 调用此接口 ,可获取数字专辑-新碟上架
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /album/list
// 调用例子 : /album/list?limit=10

// 设置
// 说明 : 登录后调用此接口 ,可获取用户设置
// 接口地址 : /setting
// 调用例子 : /setting

///////////////删除、回复评论//////////////////
// 发送/删除评论
// 说明 : 调用此接口,可发送评论或者删除评论
// 接口地址 : /comment

// 发送评论
// 必选参数
// t:1 发送, 2 回复
// tpye: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
// 0: 歌曲
// 1: mv
// 2: 歌单
// 3: 专辑
// 4: 电台
// 5: 视频
// 6: 动态
// id:对应资源 id
// content :要发送的内容
// commentId :回复的评论id (回复评论时必填)
// 调用例子 : /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
// 注意：如给动态发送评论，则不需要传 id，需要传动态的 threadId,如：/comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test

// 删除评论
// 必选参数
// t:0 删除
// tpye: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
//    0: 歌曲
//    1: mv
//    2: 歌单
//    3: 专辑
//    4: 电台
//    5: 视频
//    6: 动态
// id:对应资源 id content :内容 id,可通过 /comment/mv 等接口获取
// 调用例子 : /comment?t=0&type=1&id=5436712&commentId=1535550516319 (在广岛之恋 mv 删除评论)

export function SendOrDelComment(t, type, id, content, commentId) {
  return request({
    url: "/comment",
    params: {
      t,
      type,
      id,
      content,
      commentId,
    },
  });
}

//账号密码登陆接口
export function getLogin(phone, pwd) {
  return request({
    url: `/login/cellphone?phone=${phone}&password=${pwd}`,
    path: {
      phone,
      pwd,
    },
    method: "POST",
  });
}

export function refresh() {
  return request({
    url: "/login/refresh",
  });
}
export function outRefresh() {
  return request({
    url: "/logout",
  });
}

export function status() {
  return request({
    url: "/login/status",
  });
}
export function account() {
  return request({
    url: "/user/account",
  });
}

export function getUserDetail(uid) {
  let timestamp = new Date().getTime();
  return request({
    url: "/user/detail",
    params: {
      uid,
      timestamp,
    },
  });
}

export function getDynamic(pagesize, lasttime) {
  return request({
    url: "/event",
    params: {
      pagesize,
      lasttime,
    },
  });
}

//说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
//必选参数 : uid : 用户 id
//可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
export function getUserRecord(uid, type) {
  return request({
    url: "/user/record",
    params: {
      uid,
      type,
    },
  });
}
