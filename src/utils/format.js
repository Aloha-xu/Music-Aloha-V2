export function forMatTime(time) {
    //time是以秒为单位
    //获得m 分钟
    let m = (time / 60) | 0
    //获得s 秒
    let s = time % 60
    //拼接时间格式 04:06
    //es6 新增 字符串拼接方法
    return `${m >= 10 ? m : '0' + m}:${s >= 10 ? s : '0' + s}`
}