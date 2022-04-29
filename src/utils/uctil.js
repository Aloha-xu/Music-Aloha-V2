// //防抖 
export function _debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function getYMDHMS(timestamp) {
  let time = new Date(timestamp)
  let year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const date = (time.getDate()).toString().padStart(2, '0')
  const hours = (time.getHours()).toString().padStart(2, '0')
  const minute = (time.getMinutes()).toString().padStart(2, '0')
  const second = (time.getSeconds()).toString().padStart(2, '0')

  return year + '年' + month + '月' + date + '日 ' + hours + ':' + minute + ':' + second
}

export function getYMD(timestamp) {
  let time = new Date(timestamp)
  let year = time.getFullYear()
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const date = (time.getDate()).toString().padStart(2, '0')
  return year + '年' + month + '月' + date + '日 '
}

export function getYestaryToday(timestamp) {
  //判断是昨天的还是今天的消息  通过 日 来比较
  let Time = new Date(timestamp)
  //当前日
  const nowDate = (new Date().getDate()).toString().padStart(2, '0')
  //数据日
  const date = (Time.getDate()).toString().padStart(2, '0')

  let values
  if(nowDate == date){
    values = '今天'
  }else{
    values="昨天"
  }
  const hours = (Time.getHours()).toString().padStart(2, '0')
  const minute = (Time.getMinutes()).toString().padStart(2, '0')
  const second = (Time.getSeconds()).toString().padStart(2, '0')
  return values + hours + ':' + minute + ':' + second
}

