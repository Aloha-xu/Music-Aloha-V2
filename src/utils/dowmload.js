import axios from 'axios'
export default function download(url,name){
    axios({
        method: 'get',
        url: url,
        // 必须显式指明响应类型是一个Blob对象，这样生成二进制的数据，才能通过window.URL.createObjectURL进行创建成功
        responseType: 'blob',
    }).then((res) => {
        if (!res) {
            return
        }
        // 将lob对象转换为域名结合式的url
        let blobUrl = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        document.body.appendChild(link)
        link.style.display = 'none'
        link.href = blobUrl
        // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
        link.download = `${name}.mp3`
        // 自触发click事件
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl);
    })
}