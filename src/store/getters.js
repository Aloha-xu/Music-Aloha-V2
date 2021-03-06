//可以用getters作为统一的一个出口
export default {
  token: (state) => state.user.token,
  currentSongInfo: (state) => state.player.currentSongInfo,
  playing: (state) => state.player.playing,
  songList: (state) => state.player.songList,
  recordSongList: (state) => state.player.recordSongList,
  currentIndex: (state) => state.player.currentIndex,
  currentTime: (state) => state.player.currentTime,
  randomNumberIndex: (state) => state.player.randomNumberIndex,
  SimiSongList: (state) => state.player.SimiSongList,
  commentInfo: (state) => state.player.commentInfo,
  navCurrentIndex: (state) => state.player.navCurrentIndex,
  userSonglistInfo: (state) => state.player.userSonglistInfo,
  mySonglist: (state) => state.player.mySonglist,
  heartSonglist: (state) => state.player.heartSonglist,
  collectSonglist: (state) => state.player.collectSonglist,
  allTypeInfo: (state) => state.player.allTypeInfo,
  toUserInfo: (state) => state.player.toUserInfo,
  isLoad: (state) => state.player.isLoad,
  isShowMaxPlayer: (state) => state.player.isShowMaxPlayer,
  isTagMinPlayerToNext: (state) => state.player.isTagMinPlayerToNext,
  isShowFmPlayer: (state) => state.player.isShowFmPlayer,
  isShowUpdataComponent: (state) => state.player.isShowUpdataComponent,
  isShowMsgDrawer: (state) => state.player.isShowMsgDrawer,
  isShowInnerMsgDrawer: (state) => state.player.isShowInnerMsgDrawer,
  loading: (state) => state.player.loading,
  userinfo: (state) => state.user.userinfo,
  isShowLoginDialog: (state) => state.user.isShowLoginDialog,
  isShowLyric: (state) => state.player.isShowLyric,
  likeList: (state) => state.player.likeLists,
  currentSongListId: (state) => state.player.currentSongListId,
  videoSrc: (state) => state.player.videoSrc,
};
