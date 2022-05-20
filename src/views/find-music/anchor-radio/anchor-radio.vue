<!--




<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in cities"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left" v-html="item.label"></span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.value
        }}</span>
      </el-option>
    </el-select>
    <span v-html="cities[0].label"></span>
    <span class="active"> 132131313</span>
  </div>
</template>

<script>
export default {
  name: "AnchorRadio",
  data() {
    return {
      cities: [
        {
          value: "Beijing",
          label: `<span class="active">北</span>京`,
        },
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Nanjing",
          label: "南京",
        },
        {
          value: "Chengdu",
          label: "成都",
        },
        {
          value: "Shenzhen",
          label: "深圳",
        },
        {
          value: "Guangzhou",
          label: "广州",
        },
      ],
      value: "",
    };
  },
  created() {
    this.$store.commit("refeshCurrentNavIndex", 2);
  },
  activated() {
    //再次激活时 对比一些数据 看似否需要更新
    this.$store.commit("refeshCurrentNavIndex", 2);
  },
};
</script>

<style scoped lang="scss">
::v-deep .active {
  color: rgb(192, 15, 62);
}
</style>

 -->

<!-- 在搜索建议里面标红输入值 -->
<template>
  <el-select
    v-model="value"
    filterable
    remote
    placeholder="请选择"
    :remote-method="remoteMehtod"
    @blur="loseBlur"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.Label"
      :value="item.value"
    >
      <span style="float: left" v-html="item.label"></span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      //Lable是用于显示的
      //lable是用于标红的个别字的
      options: [
        {
          value: "选项1",
          Label: `黄金糕`,
          label: `黄金糕`,
        },
      ],
      value: "",
      //现在被标红的index
      activeTagIndex: 0,
    };
  },
  methods: {
    remoteMehtod(e) {
      this.mockData();
      this.options.forEach(({ label }, index) => {
        //拼接 用span 包裹着 匹配到的字
        //字符串  -- 》 数组

        //  " A B C D "
        //
        // A ineerindex 0
        /**
         *    A   INDEX 0     1
         *    0,0
         *    DIV
         *    0,1
         *    DIV
         *    1,LENGTH
         *
         *  AB  INDEX  0       2
         *      0,0
         *      DIV
         *      0,2
         *      DIV
         *      2,LENGTH
         *
         *    D INDEX 3      1
         *    0,3
         *    DIV
         *    3,4
         *    DIV
         *    4,LENRTG
         *
         *
         *
         *    CD INDEX 2        2
         *      0,2
         *      DIV
         *      2,4
         *      DIV
         *      4,LENGTH
         *
         *
         *    BC INDEX 1      2
         *      0,1
         *      DIV
         *      1,3
         *      DIV
         *      3,LENGTH
         */
        let searchLength = e.length;
        let innerindex = label.indexOf(e);
        if (innerindex != -1) {
          let txt2 =
            label.slice(0, innerindex) +
            `<span class="active">` +
            label.slice(innerindex, innerindex + searchLength) +
            `</span>` +
            label.slice(innerindex + searchLength, innerindex.length);
          this.options[index].label = txt2;
          this.activeTagIndex = index;
        }
      });
    },
    //模拟接口数据
    mockData() {
      this.options = [
        {
          value: "选项1",
          Label: `黄金糕`,
          label: `黄金糕`,
        },
        {
          value: "选项2",
          Label: "双皮奶",
          label: "双皮奶",
        },
        {
          value: "选项3",
          Label: "蚵仔煎",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          Label: "龙须面",
          label: "龙须面",
        },
        {
          value: "选项5",
          Label: "北京烤鸭",
          label: "北京烤鸭",
        },
      ];
    },
    //清除标红
    loseBlur() {
      console.log(111);
      this.options[this.activeTagIndex].label = this.options[
        this.activeTagIndex
      ].Label;
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .active {
  color: rgb(192, 15, 62);
}
</style>
