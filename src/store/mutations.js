//处理同步的操作
export default {

    //刷新当前nav下标  发现页面下的
    refeshCurrentNavIndex(state, index) {
        state.navCurrentIndex = index
    },

    //更改当前正在播放的歌曲的信息
    changeCurrentPlay(state, currentsonginfo) {
        state.currentSongInfo = currentsonginfo
    },

    //设置播放状态
    play(state) {
        state.playing = true
        console.log('stop')
    },

    //设置暂停状态
    stop(state) {
        state.playing = false
        console.log('play')
    },

    //已经赛选后的数据放到播放列表中
    setSongListInfo(state, songList) {
        state.songList = songList
    },


    //把歌单的全部歌曲添加到播放列表
    setAllSongsToPlayList(state, allSongs) {
        state.songList = allSongs
    },

    setToRecordSongList(state, song) {
        //判断里面是否已经存在这首歌曲
        let flag = state.recordSongList.findIndex(item => song.id === item.id);
        console.log(flag)
        if (flag === -1) {
            state.recordSongList.push(song)
        }
    },

    //列表循环  这里还没有写完列表循环与顺序循环的选择 我觉得列表循环是已有的列表中循环播放然而这个顺序循环就是按照你点进去的歌单 直接把这个歌单放到列表中 再播放 这个功能后续写
    //⭐⭐currentPlayIndex  currentIndex 这两个下标一样的 懒得改

    setNextSong(state) {
        let currentPlayIndex = state.songList.findIndex(item => item.id == state.currentSongInfo.id)
        //判断有没有下一首
        if (currentPlayIndex + 1 == state.songList.length) {
            console.log('这是最后一首歌')
            return
        } else {
            state.currentSongInfo = state.songList[currentPlayIndex + 1]
        }
        //更换现在播放歌曲的下标
        state.currentIndex = state.currentIndex + 1

        //把数据放到最近播放
        let flag = state.recordSongList.findIndex(item => item.id === state.songList[currentPlayIndex + 1].id);
        console.log(flag)
        if (flag === -1) {
            state.recordSongList.push(state.songList[currentPlayIndex + 1])
        }
    },

    //列表循环上一首
    setPreSong(state) {
        let currentPlayIndex = state.songList.findIndex(item => item.id == state.currentSongInfo.id)
        if (currentPlayIndex == 0) {
            console.log('这是第一首歌')
            return
        } else {
            state.currentSongInfo = state.songList[currentPlayIndex - 1]
        }
        //更换现在播放歌曲的下标
        state.currentIndex = state.currentIndex - 1
    },

    //随机播放下一首
    randomPlayWay(state) {
        state.randomNumberIndex = Math.floor((Math.random() * 100) + 1) //随机1-100的数字
        while (state.randomNumberIndex > state.songList.length) {
            state.randomNumberIndex = Math.floor((Math.random() * 100) + 1)
        }
        state.currentSongInfo = state.songList[state.randomNumberIndex - 1]
        state.currentIndex = state.randomNumberIndex - 1

        //把数据放到最近播放
        let flag = state.recordSongList.findIndex(item => item.id === state.currentSongInfo.id);
        console.log(flag)
        if (flag === -1) {
            state.recordSongList.push(state.currentSongInfo)
        }
    },

    //单曲循环
    singlePlayWay(state) {
        let currentPlayIndex = state.songList.findIndex(item => item.id == state.currentSongInfo.id)
        state.currentPlayIndex = state.songList[currentPlayIndex]
        state.currentIndex = currentPlayIndex

        //把数据放到最近播放
        let flag = state.recordSongList.findIndex(item => item.id === state.currentPlayIndex.id);
        console.log(flag)
        if (flag === -1) {
            state.recordSongList.push(state.currentPlayIndex)
        }
    },

    //删除
    deleteSong(state, id) {
        //找到需要删除的歌曲的下标
        let deleteIndex = state.songList.findIndex(item => item.id == id)
        state.songList.splice(deleteIndex, 1)
        //判断删除的下标与现在播放的下标是否一样
        if (state.currentIndex === deleteIndex) {
            //播放下一首
            if (deleteIndex + 1 == state.songList.length) {//是最后一首
                state.currentSongInfo = state.songList[deleteIndex--]
                //⭐⭐为什么删除最后一首歌currentSongInfo会undefind？？？
                state.currentIndex = deleteIndex - 1
            } else {//不是最后一首
                state.currentSongInfo = state.songList[deleteIndex]
                state.currentIndex = deleteIndex
            }
        }

    },

    //清空播放列表
    clearSongList(state) {
        state.songList = []
    },

    //清空播放列表
    clearRecordSongList(state) {
        state.recordSongList = []
    },

    //设置更新当前时间
    setCurrentTime(state, currentTime) {
        state.currentTime = currentTime
    },

    //加载图片
    setIsLoad(state, values) {
        state.isLoad = values
        console.log(values);
    },

    //重置当前播放音乐
    resetCurrentSongInfo(state) {
        state.currentSongInfo = {
            url: '',
            id: null,
            name: '',
            album: '',
            singer: '',
            pic: '',
            totleTime: 0,
            lyric: ''
        }
    },

    //设置当前歌曲下标
    setCurrentIndex(state, currentIndex) {
        state.currentIndex = currentIndex
    },

    //刷新用户的歌单
    updataSonglist(state, uId) {
        state.heartSonglist = state.userSonglistInfo.data.playlist[0]
        state.mySonglist = []
        state.collectSonglist = []
        for (let i = 1; i < state.userSonglistInfo.data.playlist.length; i++) {
            if (state.userSonglistInfo.data.playlist[i].userId === uId) {
                state.mySonglist.push(state.userSonglistInfo.data.playlist[i])
            } else {
                state.collectSonglist.push(state.userSonglistInfo.data.playlist[i])
            }
        }
    },

    //用户的全部的歌单信息
    setUserSonglistInfo(state, userSonglistInfo) {
        state.userSonglistInfo = userSonglistInfo
    },

    setShowMsgDarwer(state) {
        state.isShowMsgDrawer = !state.isShowMsgDrawer
    },

    setShowMsgInnerDarwer(state) {
        state.isShowInnerMsgDrawer = !state.isShowInnerMsgDrawer
    },

    //loading的状态
    setLoading(state,loading){
        state.loading = loading
    }
}