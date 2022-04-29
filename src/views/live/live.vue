<template>
  <div class="blackpink">
      <!-- <img :src="item" class="bp-img" v-for="(item, index) in picinfo" :key="index" style="width:200px"/> -->
  </div>
</template>

<script>
export default {
  name: "Live",
  methods: {
    onLoding() {
      /* 
        思路分析
        1 获取到.itemBox 宽度
        2 获取到.item 宽度
        3 求出列数
        4 求出间距
        5 实现瀑布流布局的方法
        6 滚动页面时 加载数据
     */
      // 获取到相关元素
      var item_img = document.getElementsByClassName("bp-img");
      // for(var i = 0 ; i < item_img.length ; i++){
      //   item_img[i].width = 200
      // }
      var itemBox = document.getElementsByClassName("blackpink")[0];
      // console.log(items)
      console.log(item_img)
      // 1 获取到.itemBox 宽度
      var itemBoxW = itemBox.offsetWidth;
      // 2 获取到.item 宽度
      var itemW = item_img[0].offsetWidth;
      console.log(itemBoxW)
      console.log(itemW)
      // 3 求出列数
      var column = parseInt(itemBoxW / itemW);
      console.log(column)
      // 4 求出间距
      // var distence = (itemBoxW - itemW * column) / (column - 1);
      // console.log(distence);
      // 5 实现瀑布流布局的方法
      // 定义一个存储每列高度的容器
      var arr = [];
      waterFull();
      // 6 滚动页面时 加载数据
      // window.onscroll = function () {
      //   if (window.pageYOffset + window.innerHeight > getMin(arr).minV) {
      //     var json = this.picinfo;
      //     for (var i = 0; i < json.length; i++) {
      //       var div = document.createElement("div");
      //       div.className = "item-bp";
      //       var img = document.createElement("img");
      //       img.src = json[i].src;
      //       div.appendChild(img);
      //       itemBox.appendChild(div);
      //     }
      //     waterFull();
      //   }
      // };
      // 实现瀑布流布局的方法
      function waterFull() {
        for (var j = 0; j < item_img.length; j++) {
          if (j < column) {
            //这里设置是第一行 所以不用top
            item_img[j].style.left = itemW * j + "px";
            item_img[j].style.top = 10 + "px";
            //记录第一行图片的高度
            arr[j] = item_img[j].offsetHeight;
            console.log(arr)
          } else {
            //开始第二行以下的
            var minV = getMin(arr).minV;
            var minI = getMin(arr).minI;
            item_img[j].style.left = itemW * minI + "px";
            item_img[j].style.top = minV + "px";
            console.log(minV)
            console.log(minI)
            arr[minI] = minV + item_img[j].offsetHeight;
          }
        }
      }

      // 获取数组的最小值以及索引
      function getMin(arr) {
        var obj = {};
        obj.minV = arr[0];//高度
        obj.minI = 0;//下标
        for (var i = 1; i < arr.length; i++) {
          if (obj.minV > arr[i]) {
            obj.minV = arr[i];
            obj.minI = i;
          }
        }
        console.log(obj)
        return obj;
      }
    },
  },
  data() {
    return {
      // picinfo: [
      //   require("../../assets/blackpink/1.jpg"),
      //   require("../../assets/blackpink/2.jpg"),
      //   require("../../assets/blackpink/3.jpg"),
      //   require("../../assets/blackpink/4.jpg"),
      //   require("../../assets/blackpink/5.jpg"),
      //   require("../../assets/blackpink/6.jpg"),
      //   require("../../assets/blackpink/7.jpg"),
      //   require("../../assets/blackpink/8.jpg"),
      //   require("../../assets/blackpink/9.jpg"),
      //   require("../../assets/blackpink/10.jpg"),

      //   require("../../assets/blackpink/11.jpg"),
      //   require("../../assets/blackpink/12.jpg"),
      //   require("../../assets/blackpink/13.jpg"),
      //   require("../../assets/blackpink/14.jpg"),
      //   require("../../assets/blackpink/15.jpg"),
      //   require("../../assets/blackpink/16.jpg"),
      //   require("../../assets/blackpink/17.jpg"),
      //   require("../../assets/blackpink/18.jpg"),
      //   require("../../assets/blackpink/19.jpg"),
      //   require("../../assets/blackpink/20.jpg"),

      //   require("../../assets/blackpink/30.jpg"),
      //   require("../../assets/blackpink/40.jpg"),
      //   require("../../assets/blackpink/50.jpg"),
      //   require("../../assets/blackpink/60.jpg"),
      //   require("../../assets/blackpink/70.jpg"),
      //   require("../../assets/blackpink/80.jpg"),
      //   require("../../assets/blackpink/90.jpg"),

      //   require("../../assets/blackpink/21.jpg"),
      //   require("../../assets/blackpink/31.jpg"),
      //   require("../../assets/blackpink/41.jpg"),
      //   require("../../assets/blackpink/51.jpg"),
      //   require("../../assets/blackpink/61.jpg"),
      //   require("../../assets/blackpink/71.jpg"),
      //   require("../../assets/blackpink/81.jpg"),

      //   require("../../assets/blackpink/22.jpg"),
      //   require("../../assets/blackpink/32.jpg"),
      //   require("../../assets/blackpink/42.jpg"),
      //   require("../../assets/blackpink/52.jpg"),
      //   require("../../assets/blackpink/62.jpg"),
      //   require("../../assets/blackpink/72.jpg"),
      //   require("../../assets/blackpink/82.jpg"),

      //   require("../../assets/blackpink/23.jpg"),
      //   require("../../assets/blackpink/33.jpg"),
      //   require("../../assets/blackpink/43.jpg"),
      //   require("../../assets/blackpink/63.jpg"),
      //   require("../../assets/blackpink/73.jpg"),
      //   require("../../assets/blackpink/83.jpg"),

      //   require("../../assets/blackpink/24.jpg"),
      //   require("../../assets/blackpink/34.jpg"),
      //   require("../../assets/blackpink/44.jpg"),
      //   require("../../assets/blackpink/54.jpg"),
      //   require("../../assets/blackpink/64.jpg"),
      //   require("../../assets/blackpink/74.jpg"),
      //   require("../../assets/blackpink/84.jpg"),

      //   require("../../assets/blackpink/25.jpg"),
      //   require("../../assets/blackpink/35.jpg"),
      //   require("../../assets/blackpink/45.jpg"),
      //   require("../../assets/blackpink/55.jpg"),
      //   require("../../assets/blackpink/65.jpg"),
      //   require("../../assets/blackpink/75.jpg"),
      //   require("../../assets/blackpink/85.jpg"),

      //   require("../../assets/blackpink/26.jpg"),
      //   require("../../assets/blackpink/36.jpg"),
      //   require("../../assets/blackpink/46.jpg"),
      //   require("../../assets/blackpink/56.jpg"),
      //   require("../../assets/blackpink/66.jpg"),
      //   require("../../assets/blackpink/76.jpg"),
      //   require("../../assets/blackpink/86.jpg"),

      //   require("../../assets/blackpink/27.jpg"),
      //   require("../../assets/blackpink/47.jpg"),
      //   require("../../assets/blackpink/57.jpg"),
      //   require("../../assets/blackpink/67.jpg"),
      //   require("../../assets/blackpink/77.jpg"),
      //   require("../../assets/blackpink/87.jpg"),

      //   require("../../assets/blackpink/28.jpg"),
      //   require("../../assets/blackpink/38.jpg"),
      //   require("../../assets/blackpink/48.jpg"),
      //   require("../../assets/blackpink/58.jpg"),
      //   require("../../assets/blackpink/68.jpg"),
      //   require("../../assets/blackpink/78.jpg"),
      //   require("../../assets/blackpink/88.jpg"),

      //   require("../../assets/blackpink/29.jpg"),
      //   require("../../assets/blackpink/39.jpg"),
      //   require("../../assets/blackpink/49.jpg"),
      //   require("../../assets/blackpink/59.jpg"),
      //   require("../../assets/blackpink/69.jpg"),
      //   require("../../assets/blackpink/79.jpg"),
      //   require("../../assets/blackpink/89.jpg"),
      // ],
    };
  },
};
</script>

<style scoped lang='scss'>
.blackpink {
  overflow: scroll;
  height: 90vh;
  width: 1700px;
	margin: 0 auto;
	position: relative;
}
.bp-img {
	position: absolute;
}
</style>