import Vue from 'vue'
import VueRouter from 'vue-router'
import { IsPc } from '@/utils/uctil.js'

Vue.use(VueRouter)
const routes = [
    {
        path: '',
        redirect: '/findmusic'
    },
    {
        path: '/findmusic',
        component: () => import(/* webpackChunkName: "findmusci" */ '../views/find-music/find-music.vue'),
        redirect: '/recommend',
        children: [
            {
                path: '/recommend',
                component: () => import(/* webpackChunkName: "recommend" */ '../views/find-music/recommend/recommend.vue'),
            },
            {
                path: '/anchorradio',
                component: () => import(/* webpackChunkName: "anchorradio" */ '../views/find-music/anchor-radio/anchor-radio.vue')
            },
            {
                path: '/newmusic',
                component: () => import(/* webpackChunkName: "newmusic" */ '../views/find-music/new-music/new-music.vue')
            },
            {
                path: '/rank',
                component: () => import(/* webpackChunkName: "rank" */ '../views/find-music/rank/rank.vue')
            },
            {
                path: '/singer',
                component: () => import(/* webpackChunkName: "singer" */ '../views/find-music/singer/singer.vue')
            },
            {
                path: '/songlist',
                component: () => import(/* webpackChunkName: "songlist" */ '../views/find-music/song-list/song-list.vue'),
            },
            {
                path: '/highqualityplaylist',
                component: () => import(/* webpackChunkName: "highqualityplaylist" */ '../views/high-quality-playlist/high-quality-playlist.vue')
            }
        ]
    },
    {
        path: '/friend',
        component: () => import(/* webpackChunkName: "friend" */ '../views/friend/friend.vue')
    },
    {
        path: '/live',
        component: () => import(/* webpackChunkName: "live" */ '../views/live/live.vue')
    },
    {
        path: '/videohome',
        component: () => import(/* webpackChunkName: "videohome" */ '../views/video/video-home.vue'),
        redirect: '/video',
        children: [
            {
                path: '/mv',
                component: () => import(/* webpackChunkName: "mv" */ '../views/video/mv.vue')
            },
            {
                path: '/video',
                component: () => import(/* webpackChunkName: "video" */ '../views/video/video.vue')
            }
        ]
    },
    {
        path: '/fm',
        component: () => import(/* webpackChunkName: "fm" */ '../views/private-fm/private-fm.vue')
    },
    {
        path: '/record',
        component: () => import(/* webpackChunkName: "record" */ '../views/user-record/user-record.vue')
    },
    {
        path: '/collect',
        component: () => import(/* webpackChunkName: "collect" */ '../views/mine/collect/collect.vue')
    },
    {
        path: '/icloudmusic',
        component: () => import(/* webpackChunkName: "icloudmusic" */ '../views/mine/icloud-music/icloud-music.vue')
    },
    {
        path: '/localmusci',
        component: () => import(/* webpackChunkName: "localmusci" */ '../views/mine/local-music/local-music.vue')
    },
    {
        path: '/localmanage',
        component: () => import(/* webpackChunkName: "localmanage" */ '../views/mine/local-manage/local-manage.vue')
    },
    {
        path: '/radio',
        component: () => import(/* webpackChunkName: "radio" */ '../views/mine/radio/radio.vue')
    },
    {
        path: '/createsongcates',
        component: () => import(/* webpackChunkName: "createsongcates" */ '../views/create-song-list/create-song-list.vue')
    },
    {
        path: '/collectsongcates',
        component: () => import(/* webpackChunkName: "collectsongcates" */ '../views/collect-song-list/collect-song-list.vue')
    },
    {
        path: '/playlistdetail/:id',
        component: () => import(/* webpackChunkName: "playlistdetail" */ '../views/play-list-detail/play-list-detail.vue'),
    },
    {
        path: '/albumlistdetail/:id',
        component: () => import(/* webpackChunkName: "albumlistdetail" */ '../views/album-list-detail/album-list-detail.vue'),
    },
    {
        path: '/singerlistdetail/:id',
        component: () => import(/* webpackChunkName: "singerlistdetail" */ '../views/singer-list-detail/singer-list-detail.vue'),
    },
    {
        path: '/cloudsearch',
        component: () => import(/* webpackChunkName: "cloudsearch" */ '../views/search-detail/search-detail.vue'),
    },
    {
        path: '/allmvpapg',
        component: () => import(/* webpackChunkName: "allmvpapg" */ '../views/video/all-mv-papg.vue'),
    },
    {
        path: '/mvdetail/:id',
        component: () => import(/* webpackChunkName: "mvdetail" */ '../views/mv-detail/mv-detail.vue'),
    },
    {
        path: '/userupdata/:id',
        component: () => import(/* webpackChunkName: "userupdata" */ '../views/user-updata-papg/updata-papg.vue'),
    },
    {
        path: '/userdetail/:id',
        component: () => import(/* webpackChunkName: "userdetail" */ '../views/user-detail/user-detail.vue'),
    },
]

const routerToModile = [
    {
        path: '',
        redirect: '/home',
        component: () => import(/* webpackChunkName: "homeToModile" */ '../AppToModile.vue'),
    },
]

const currentRoutes = IsPc() ? routes : routerToModile;

//注册router
const router = new VueRouter({
    //routes名字
    routes: currentRoutes,
    mode: "history"
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//导出router
export default router