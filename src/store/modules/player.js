import {
  getUserPlaylist,
  getCheckMusic,
  getSongLyric,
  getSimiPlayList,
  getMusicComment,
} from "@/network/api";
import download from "@/utils/download.js";
import { parseLyric } from "@/utils/lyric";
const player = {
  state: {
    //当前的播放歌曲信息
    currentSongInfo: {
      url: "",
      id: "",
      name: "",
      album: "",
      singer: "",
      pic: "",
      totleTime: 0, //ms单位
      lyric: [],
    },

    //是否播放
    playing: false,

    //播放列表的信息
    songList: [],

    //歌曲播放记录存放表
    recordSongList: [],

    //当前播放歌曲的下标
    currentIndex: 0,

    //当前播放到哪一刻 也豪秒为单位的值
    currentTime: "00:00",

    //随机数
    randomNumberIndex: 0,

    //某一首歌的相似歌单信息
    SimiSongList: {},

    //某一首歌的评论数据
    commentInfo: [],

    //当前导航下标 发现音乐下的推荐、歌单、主播电台
    navCurrentIndex: 0,

    //用户的全部歌单信息
    userSonglistInfo: [],

    //自己创建的歌单
    mySonglist: [],

    //心动歌单
    heartSonglist: null,

    //收藏的歌单
    collectSonglist: null,

    //全部的标签数据 弹出框
    allTypeInfo: [],

    //对象信息
    toUserInfo: {},

    //是否加再图片
    isLoad: false,

    //控制max-min播放器显示
    isShowMaxPlayer: false,

    //控制minplayer的点击显示隐藏maxplayer
    isShowFmPlayer: false,

    //标识是minplayer点击下一首
    isTagMinPlayerToNext: true,

    //控制palylistdetail页面下的updata组件是否显示
    isShowUpdataComponent: false,

    //控制top-tabbar页面下的drawer组件是否显示
    isShowMsgDrawer: false,

    //控制top-tabbar页面下的innerdrawer组件是否显示
    isShowInnerMsgDrawer: false,

    //loading状态
    loading: null,

    //控制 歌词显示是否
    isShowLyric: false,

    //user喜欢的音乐列表
    likeLists: [],

    //当前播放歌曲的歌单id  用于判断是不是点击同一个歌单里面的歌曲，这个时候就不把歌单放到vuex里面了。
    currentSongListId: null,

    videoSrc: ''
  },

  mutations: {
    //设置videoSrc
    SET_VIDEO_SRC(state, src) {
      state.videoSrc = src;
    },
    //设置当前播放歌曲的歌单id
    SET_CURRENT_SONGLIST_ID(state, id) {
      state.currentSongListId = id;
    },

    //刷新当前nav下标  发现页面下的
    refeshCurrentNavIndex(state, index) {
      state.navCurrentIndex = index;
    },

    //更改当前正在播放的歌曲的信息
    changeCurrentPlay(state, currentsonginfo) {
      state.currentSongInfo = currentsonginfo;
    },

    //设置播放状态
    play(state) {
      state.playing = true;
      console.log("play");
    },

    //设置暂停状态
    stop(state) {
      state.playing = false;
      console.log("stop");
    },

    //已经赛选后的数据放到播放列表中
    setSongListInfo(state, songList) {
      state.songList = songList;
    },

    //把歌单的全部歌曲添加到播放列表
    setAllSongsToPlayList(state, allSongs) {
      state.songList = allSongs;
    },

    SET_RECORD_SONG_LIST(state, song) {
      //判断里面是否已经存在这首歌曲
      let flag = state.recordSongList.findIndex((item) => song.id === item.id);
      if (flag === -1) {
        state.recordSongList.push(song);
      }
    },

    //列表循环  这里还没有写完列表循环与顺序循环的选择 我觉得列表循环是已有的列表中循环播放然而这个顺序循环就是按照你点进去的歌单 直接把这个歌单放到列表中 再播放 这个功能后续写
    //⭐⭐currentPlayIndex  currentIndex 这两个下标一样的 懒得改

    setNextSong(state) {
      let currentPlayIndex = state.songList.findIndex(
        (item) => item.id == state.currentSongInfo.id
      );
      //判断有没有下一首
      if (currentPlayIndex + 1 == state.songList.length) {
        console.log("这是最后一首歌");
        return;
      } else {
        state.currentSongInfo = state.songList[currentPlayIndex + 1];
      }
      //更换现在播放歌曲的下标
      state.currentIndex = state.currentIndex + 1;

      //把数据放到最近播放
      let flag = state.recordSongList.findIndex(
        (item) => item.id === state.songList[currentPlayIndex + 1].id
      );
      if (flag === -1) {
        state.recordSongList.push(state.songList[currentPlayIndex + 1]);
      }
    },
    //私人FM的下一首
    setNextSongForFm(state) {
      let currentPlayIndex = state.songList.findIndex(
        (item) => item.id == state.currentSongInfo.id
      );
      state.currentSongInfo = state.songList[currentPlayIndex + 1];
      //更换现在播放歌曲的下标
      state.currentIndex = state.currentIndex + 1;

      //把数据放到最近播放
      let flag = state.recordSongList.findIndex(
        (item) => item.id === state.songList[currentPlayIndex + 1].id
      );
      if (flag === -1) {
        state.recordSongList.push(state.songList[currentPlayIndex + 1]);
      }
    },

    //列表循环上一首
    setPreSong(state) {
      let currentPlayIndex = state.songList.findIndex(
        (item) => item.id == state.currentSongInfo.id
      );
      if (currentPlayIndex == 0) {
        console.log("这是第一首歌");
        return;
      } else {
        state.currentSongInfo = state.songList[currentPlayIndex - 1];
      }
      //更换现在播放歌曲的下标
      state.currentIndex = state.currentIndex - 1;
    },

    //随机播放下一首
    randomPlayWay(state) {
      state.randomNumberIndex = Math.floor(Math.random() * 100 + 1); //随机1-100的数字
      while (state.randomNumberIndex > state.songList.length) {
        state.randomNumberIndex = Math.floor(Math.random() * 100 + 1);
      }
      state.currentSongInfo = state.songList[state.randomNumberIndex - 1];
      state.currentIndex = state.randomNumberIndex - 1;

      //把数据放到最近播放
      let flag = state.recordSongList.findIndex(
        (item) => item.id === state.currentSongInfo.id
      );
      console.log(flag);
      if (flag === -1) {
        state.recordSongList.push(state.currentSongInfo);
      }
    },

    //单曲循环
    singlePlayWay(state) {
      let currentPlayIndex = state.songList.findIndex(
        (item) => item.id == state.currentSongInfo.id
      );
      state.currentPlayIndex = state.songList[currentPlayIndex];
      state.currentIndex = currentPlayIndex;
      // 把数据放到最近播放
      let flag = state.recordSongList.findIndex(
        (item) => item.id === state.currentPlayIndex.id
      );
      if (flag === -1) {
        state.recordSongList.push(state.currentPlayIndex);
      }
    },

    //删除
    deleteSong(state, id) {
      //找到需要删除的歌曲的下标
      let deleteIndex = state.songList.findIndex((item) => item.id == id);
      if (deleteIndex === 0) {
        // state.playing = false;
        // state.isLoad = false;
        // state.currentSongInfo = {
        //   url: "",
        //   id: null,
        //   name: "",
        //   album: "",
        //   singer: "",
        //   pic: "",
        //   totleTime: 0,
        //   lyric: "",
        // };
      }
      state.songList.splice(deleteIndex, 1);
      //删除的index等于当前播放的index
      if (state.currentIndex === deleteIndex) {
        // //播放下一首
        // if (deleteIndex + 1 == state.songList.length) {
        //   //是最后一首
        //   state.currentSongInfo = state.songList[deleteIndex--];
        //   //⭐⭐为什么删除最后一首歌currentSongInfo会undefind？？？
        //   state.currentIndex = deleteIndex - 1;
        // } else {
        //   //不是最后一首
        //   state.currentSongInfo = state.songList[deleteIndex];
        //   state.currentIndex = deleteIndex;
        // }
        state.currentSongInfo = state.songList[deleteIndex];
        state.currentIndex = deleteIndex;
      }

      //删除的index小于当前播放的index
      if (deleteIndex < state.currentIndex) {
        state.currentIndex--;
      }
    },

    //清空播放列表
    clearSongList(state) {
      state.songList = [];
    },

    //清空播放列表
    clearRecordSongList(state) {
      state.recordSongList = [];
    },

    //设置更新当前时间
    setCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    },

    //加载图片
    setIsLoad(state, values) {
      state.isLoad = values;
      console.log(values);
    },

    //重置当前播放音乐
    resetCurrentSongInfo(state) {
      state.currentSongInfo = {
        url: "",
        id: null,
        name: "",
        album: "",
        singer: "",
        pic: "",
        totleTime: 0,
        lyric: "",
      };
    },

    //设置当前歌曲下标
    setCurrentIndex(state, currentIndex) {
      state.currentIndex = currentIndex;
    },

    //刷新用户的歌单
    updataSonglist(state, uId) {
      state.heartSonglist = state.userSonglistInfo.data.playlist[0];
      state.mySonglist = [];
      state.collectSonglist = [];
      for (let i = 1; i < state.userSonglistInfo.data.playlist.length; i++) {
        if (state.userSonglistInfo.data.playlist[i].userId === uId) {
          state.mySonglist.push(state.userSonglistInfo.data.playlist[i]);
        } else {
          state.collectSonglist.push(state.userSonglistInfo.data.playlist[i]);
        }
      }
    },

    //用户的全部的歌单信息
    setUserSonglistInfo(state, userSonglistInfo) {
      state.userSonglistInfo = userSonglistInfo;
    },

    setShowMsgDarwer(state) {
      state.isShowMsgDrawer = !state.isShowMsgDrawer;
    },

    setShowMsgInnerDarwer(state) {
      state.isShowInnerMsgDrawer = !state.isShowInnerMsgDrawer;
    },

    //loading的状态
    setLoading(state, loading) {
      state.loading = loading;
    },

    //设置是否展示fm播放器
    SET_IS_SHOW_FM_PLAYER(state, val) {
      state.isShowFmPlayer = val;
    },
    //设置相似歌单
    SET_SIMI_SONG_LIST(state, info) {
      state.SimiSongList = info;
    },
    //设置评论
    SET_COMMENT_INFO(state, info) {
      state.commentInfo = info;
    },
    //设置是否显示max播放器
    SET_IS_SHOW_MAX_PLAYER(state, val) {
      state.isShowMaxPlayer = val;
    },
    //设置 展示 编辑自己的歌单信息
    SET_IS_SHOW_UPDATA_COMPONENT(state, val) {
      state.isShowUpdataComponent = val;
    },
    //设置当前播放歌曲信息里面的id
    SET_CURRENT_SONG_ID(state, id) {
      state.currentSongInfo.id = id;
    },
    //设置对象信息
    SET_TO_USER_INFO(state, info) {
      state.toUserInfo = info;
    },
    //设置minplayer点击下一首
    SET_Tag_MIN_PLAYER_TO_NEXT(state) {
      state.isTagMinPlayerToNext = !state.isTagMinPlayerToNext;
    },
    //设置isShowLyric歌词显示
    SET_SHOW_LYRIC(state) {
      state.isShowLyric = !state.isShowLyric;
    },
    //设置allTypeInfo
    SET_ALL_TYPE(state, info) {
      state.allTypeInfo = info;
    },
    //设置collectSonglist
    SET_COLLECT_SONGLIST(state, info) {
      state.collectSonglist = info;
    },
    //设置mySonglist
    SET_MY_SONGLIST(state, info) {
      state.mySonglist = info;
    },
    //在歌单列表中插入歌曲
    ADD_SONG_TO_PLAYLIST(state, info) {
      //如果是同一歌单里面的歌曲 那就换顺序
      if (state.songList.length == 0) {
        state.songList.splice(state.currentIndex + 1, 0, info);
      } else {
        let flag = state.songList.findIndex((item) => item.id === info.id);
        state.songList.splice(state.currentIndex + 1, 0, info);
        if (flag != -1) {
          state.songList.splice(flag, 1);
        }
      }
    },
    //设置喜欢的歌单列表  现在只用在了maxplayer的喜欢删
    SET_LIKELISTS(state, info) {
      state.likeLists = info;
    },
    //设置当前播放歌曲的歌词
    SET_CURRENT_SONG_LYRIC(state, info, index) {
      state.songList[index].lyric = info;
    },
  },

  actions: {
    //处理不同播放方式的下一首歌
    setNextSongOrderPlayWay({ commit }, wayOfPlay) {
      wayOfPlay == 0 && commit('setNextSong')
      wayOfPlay == 1 && commit('randomPlayWay')
      wayOfPlay == 2 && commit('singlePlayWay')
      wayOfPlay == 3 && commit('setNextSong')
    },

    //获取用户的歌单列表
    async getUserPlayList({ commit }) {
      let uInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      commit("setUserSonglistInfo", playlist);
      commit("updataSonglist", uId);
    },

    //下载歌曲  后面加版权问题
    async downloadSong({ state }, songInfo) {
      await download(songInfo.url, songInfo.name);
    },

    //
    async clickToPlaySong({ state, commit }, songInfo) {
      try {
        const checkmusic = await getCheckMusic(songInfo.id);
        //判断音乐是否有版权
        if (checkmusic.data.success) {
          //获取歌曲的歌词
          let lyric = await getSongLyric(songInfo.id);

          //更新当前播放的下标
          commit(
            "setCurrentIndex",
            state.songList.findIndex((item) => item.id === songInfo.id)
          );

          //设置歌词
          songInfo.lyric = parseLyric(lyric.data.lrc.lyric);

          //修改当前播放的音乐信息
          commit("changeCurrentPlay", songInfo);

          //isload图片
          commit("setIsLoad", "true");

          //获取某一首歌的相似歌单信息
          let simimusic = await getSimiPlayList(songInfo.id);
          commit("SET_SIMI_SONG_LIST", simimusic.data.playlists);
          //获取某一首歌的评论
          let musicComments = await getMusicComment(songInfo.id, 100);
          commit("SET_COMMENT_INFO", musicComments.data.comments);
          //添加播放记录
          commit("SET_RECORD_SONG_LIST", songInfo);
          //是不是fm
          commit("SET_IS_SHOW_FM_PLAYER", false);
        }
      } catch (error) {
        alert("音乐没有版权");
      }
    },
  },
};

export default player;
