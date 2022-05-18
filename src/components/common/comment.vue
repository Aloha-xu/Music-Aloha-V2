<template>
  <div class="comment">
    <div class="comment-input-area">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="140"
        show-word-limit
        id="input"
        ref="input_"
      >
      </el-input>
      <el-button size="medium" round class="send" @click="sendComment"
        >发送</el-button
      >
    </div>
    <div class="comment-item">
      <CommentCard
        v-for="(item, index) in commentInfo"
        :key="index + item.content"
        :likedCount="item.likedCount"
        :name="item.user.nickname"
        :pic="item.user.avatarUrl"
        :text="item.content"
        :time="item.time"
        :uid="item.commentId"
        @handleReplyComment="handleReplyComment"
      ></CommentCard>
    </div>
  </div>
</template>
<script>
import CommentCard from "./CommentCard.vue";
import { SendOrDelComment } from "../../network/api";
export default {
  components: { CommentCard },
  name: "Comment",
  data() {
    return {
      textarea: "",
      uid: null,
    };
  },
  props: {
    commentInfo: {
      type: Array,
      default: () => {
        return [];
      },
    },
    id: [Number, String],
    type: {
      type: Number,
      default: 0,
    },
    t: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    async sendComment() {
      const { data } = await SendOrDelComment(
        this.t,
        this.type,
        this.id,
        this.textarea,
        this.uid
      );
      this.textarea = "";
      console.log("刚刚发布的评论", data);

      //没必要 refesh  直接 内存 加上去就可以了
      this.$emit("refeshCommrnt", data.comment);
    },
    handleReplyComment(value) {
      this.textarea = "回复" + value[1];
      this.uid = value[0];
      this.t = 2;
      //两种方法设置focus 一个是原生的 一个是通过ref
      // document.getElementById("input").focus();
      this.$refs.input_.focus();
    },
  },
};
</script>

<style scoped lang="scss">
.comment {
  width: 100%;
}
.comment .comment-input-area {
  width: 98%;
}
.send {
  margin-top: 10px;
  float: right;
}
</style>
